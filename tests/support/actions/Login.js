const { expect } = require('@playwright/test')

// export class LoginPage {
export class Login {
    constructor(page) {
        this.page = page
    }

    // Função Do para logar
    async do(email, password, username) {
        await this.visit()
        await this.submit(email, password)
        await this.isLoggedIn(username)
    }

    // Async é uma função
    async visit() {
        //Usando caminho relativo pq o baseURL já está configurado na config
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible({ timeout: 10000 })
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

    // Como ao logar vai para página de Movies, pelo conceito do pageobject precisa ser separado da tela de loginpage
    //Porém, não vou usar o padrão PageObject, mas Custom Action
    async isLoggedIn(username) {
        //Aguarda até que a pág esteja em um estado específico antes de verificar a url, fica ocioso até o próx tráfego de rede
        // await this.page.waitForLoadState('networkidle')

        //O de cima deu problema pq continuava carregando até dar timeout
        // await this.page.waitForLoadState('load')

        //Uma forma de garantir que está na área logada
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()

        //Verifica que na url tem o admin 
        // await expect(this.page).toHaveURL(/.*admin/)

        //Foi implementada a mensagem de login
        const loggedUser = this.page.locator('.logged-user')
        //Interpolação de string no Js
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }

}