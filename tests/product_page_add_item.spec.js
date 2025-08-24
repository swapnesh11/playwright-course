import { test, expect } from "@playwright/test"

test.skip("Product Page Add To Basket", async ({ page }) => {
    await page.goto("/")

    //const addToBasketButton =  page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
    //const addToBasketButton = page.getByRole('button',{ name: 'Add to Basket'}).first()
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')

    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText('Add to Basket')    
    await expect(basketCounter).toHaveText("0")
 
    await addToBasketButton.click()

    //console.log("Count of items in the Basket", basketCounter.getByText())
    await expect(addToBasketButton).toHaveText('Remove from Basket')
    await expect(basketCounter).toHaveText("1")
    //console.log(await page.getByRole('button',{ name: 'Add to Basket'}).count())


    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL("/basket")
    //await page.pause()
    
})



