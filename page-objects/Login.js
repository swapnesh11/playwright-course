import { timeout } from "./../playwright.config.js"

export class Login{

    constructor(page){
        this.page = page
        this.moveToSignupButton = this.page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignup = async() => {
        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})


    }
}