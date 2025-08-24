export class RegisterPage{

    constructor(page){
        this.page = page

        this.emailInput = this.page.getByPlaceholder('e-mail')
        this.passwordInput = this.page.getByPlaceholder('password')
        this.registerButton = this.page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async(email,password) => {

        await this.emailInput.waitFor()
        //const emailId = uuidv4()
        //const email = emailId + "@gmail.com"
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        //const password = uuidv4()
        await this.passwordInput.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()

    }
}