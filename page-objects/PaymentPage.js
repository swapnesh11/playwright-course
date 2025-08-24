import {expect} from "@playwright/test"
import { timeout } from "./../playwright.config.js"

export class PaymentPage{
    constructor(page){
        this.page = page

        this.discountCode = page
                                .frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')     
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
             
        this.discountCodeActivatedMessage = page.locator('[data-qa="discount-active-message"]')                      
        this.discountedValue= page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntill = page.locator('[data-qa="valid-until"]')
        this.creditCardCVC = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        
        //This is incorrect - expect(await this.discountCodeInput).toContainText(code, {timeout: 15000}) 

        //option 1 for laggy input -copy paste code
        await this.discountCodeInput.waitFor()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
        
        // //option 2 - manually entering the key hold down - NICE TO HAVE
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, {delay : 1000})
        // expect(await this.discountCodeInput.inputValue).tobe(code)

         await this.activateDiscountButton.waitFor()

        await expect(this.discountCodeActivatedMessage).not.toBeVisible()
         await this.activateDiscountButton.click()
        await this.discountCodeActivatedMessage.waitFor()

   
        await this.discountedValue.waitFor()       
        const discountValueText  =  await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber)      
      
        await this.totalValue.waitFor()        
        const totalValueText = await  this.totalValue.innerText()
        const totalValueTextOnlyStringNumber = totalValueText.replace("$","")
        const totalValueNumber = parseInt(totalValueTextOnlyStringNumber)       
        expect(discountValueNumber).toBeLessThan(totalValueNumber)

   }

   fillPaymentDetails = async(paymentDetails) => {

    await this.creditCardOwner.waitFor()
    await this.creditCardOwner.fill(paymentDetails.creditCardOwner)

    await this.creditCardNumber.waitFor()
    await this.creditCardNumber.fill(paymentDetails.creditCardNumber)

    await this.validUntill.waitFor()
    await this.validUntill.fill(paymentDetails.validUntill)

    await this.creditCardCVC.waitFor()
    await this.creditCardCVC.fill(paymentDetails.creditCardCVC)


   }

   completePayment = async() => {

    await this.payButton.waitFor()
    await this.payButton.click()
    await this.page.waitForURL(/\/thank-you/, {timeout : 50000} )
    
   }
}