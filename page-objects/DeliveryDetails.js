import { expect } from "@playwright/test"
import { timeout } from "./../playwright.config.js"

export class DeliveryDetails{

    constructor (page) {
        this.page = page

            //getByRole('textbox', { name: 'First name' })
    //getByRole('textbox', { name: 'Last name' })
    //getByRole('textbox', { name: 'Street' })
    //getByRole('textbox', { name: 'Post code' })
    //getByRole('textbox', { name: 'City' })
    //data-qa="country-dropdown"
        this.inputFirstName = page.getByPlaceholder('First Name')
        this.inputLastName = page.getByPlaceholder('Last Name')
        this.inputStreet = page.getByPlaceholder('Street')
        this.inputPostCode = page.getByPlaceholder('Post Code')
        this.inputCity = page.getByPlaceholder('City')
        this.inputCountry = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainter = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })

    
    }


    fillDetails = async(userAddress) =>{
  
        await this.inputFirstName.waitFor()
        await this.inputFirstName.fill(userAddress.firstName)
        await this.inputLastName.waitFor()
        await this.inputLastName.fill(userAddress.lastName)
        await this.inputStreet.waitFor()
        await this.inputStreet.fill(userAddress.street)
        await this.inputPostCode.waitFor()
        await this.inputPostCode.fill(userAddress.postCode)
        await this.inputCity.waitFor()
        await this.inputCity.fill(userAddress.city)
        await this.inputCountry.waitFor()
        await this.inputCountry.selectOption(userAddress.country)
                
    }

    saveDetails = async() => {
        const addressCountBeforeSaving = await this.saveAddressContainter.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.saveAddressContainter).toHaveCount(addressCountBeforeSaving + 1)  
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.inputFirstName.inputValue())

         await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.inputLastName.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.inputStreet.inputValue())

        await this.savedAddressPostCode.first().waitFor()
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.inputPostCode.inputValue())


        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.inputCity.inputValue())


        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.inputCountry.inputValue())

    }

    continueToPayment = async () => {

        await  this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})  
        
    }
}