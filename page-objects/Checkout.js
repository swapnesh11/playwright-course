import { expect } from "@playwright/test"
import { timeout } from "./../playwright.config.js"
export class Checkout{

    constructor (page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsCountBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        //console.warn({allPriceTexts})
        const filteredNumbers = allPriceTexts.map((element)=>{
            const withoutDallarSign = element.replace("$","")
            return parseInt(withoutDallarSign,10)
        }) 
        
        const smallestPrice = Math.min(...filteredNumbers)
        const smallestPriceIndex = filteredNumbers.indexOf(smallestPrice)
      //  console.warn({smallestPrice})
       // console.warn({smallestPriceIndex})        
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsCountBeforeRemoval - 1)
    }

    continueToCheckout = async() =>{
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout:3000})
    }
}