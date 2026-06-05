//PascalCase = classes = LandindPage
//camelCase = constantes = landingPage
const { expect } = require('@playwright/test')

//Custom Actions cria classe por funcionalidades, não por páginas como o PageObject
// export class LandingPage {

export class Leads {

    // Usado para conseguir acessar o page dentro do teste
    constructor(page) {
        this.page = page
    }

    // ------ AÇÕES DA LANDING PAGE ----------

    async visit() {
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    // Alvo de validação
    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    // ------ AÇÕES DA GESTÃO DE LEADS ----------

    async visitManagement() {
        const leadsMenu = this.page.locator('a[href$=leads]')
        await expect(leadsMenu).toHaveText('Leads')
        await leadsMenu.click()
        await this.page.waitForLoadState('networkidle')
    }

    async searchManagement(target) {        
        const searchInput = this.page.getByPlaceholder('Busque pelo email')
        
        //Garante que o input está visível antes de interagir
        await searchInput.waitFor({ state: 'visible' })
        await searchInput.fill(target)

        //Clica na busca
        await this.page.click('.actions button')

        //Aguarda a api de busca responder
        await this.page.waitForLoadState('networkidle')
    }
    
    async remove(email) {
        // O filter garante que o Playwright interaja apenas com a linha que contém esse texto
        const row = this.page.getByRole('row').filter({ hasText: email })

        await row.getByRole('button').click()
        await this.page.click('.confirm-removal')
    }

    // ------ ASSERÇÕES ----------

    async tableHave(content) {
        const rows = this.page.locator('table tbody tr')
        await expect(rows).toContainText(content)
    }

    async emptyListHaveText(expectedText) {
        await expect(this.page.getByText(expectedText)).toBeVisible({ timeout: 5000 })
    } 
    
}