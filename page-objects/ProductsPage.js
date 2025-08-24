import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"



export class ProductsPage{

    constructor(page){
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async() => {
        this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificButton = this.addButtons.nth(index)
        await specificButton.waitFor()
        await expect(specificButton).toHaveText('Add to Basket')
        const navigation = new Navigation(this.page)

        //only Desktop viewport
        let basketCounterBeforeAdding
        if(await isDesktopViewport(this.page)){
            basketCounterBeforeAdding = await navigation.getBasketCount()
         
        }

        await specificButton.click()


        //only Desktop viewport
        if(await isDesktopViewport(this.page)){
            const basketCounterAfterAdding = await navigation.getBasketCount()
            expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
        }
        
        await expect(specificButton).toHaveText('Remove from Basket')        

    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        //get order of products
        await this.productTitle.first().waitFor()
        const allProductTitlesBeforeSelect = await this.productTitle.allInnerTexts()
       // console.warn({allProductTitlesBeforeSelect})
        await this.sortDropdown.selectOption("price-asc")
        //get order of products
        const allProductTitlesAfterSelect = await this.productTitle.allInnerTexts()
        // expect the list changes
        expect(allProductTitlesBeforeSelect).not.toEqual(allProductTitlesAfterSelect)
    }

}