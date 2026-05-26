const { expect } = require('@playwright/test')

export class LoginPage {
    constructor(page) {

        this.page = page
    }

    // Async é uma função
    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }

    // Caso localizador não tenha algo em comum usa exemplo abaixo
    // async alertEmailHaveText(text) {
    //     const alert = this.page.locator('.email-alert')
    //     await expect(alert).toHaveText(text)
    // }

    //  async alertPasswordHaveText(text) {
    //     const alert = this.page.locator('.password-alert')
    //     await expect(alert).toHaveText(text)
    // }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

}