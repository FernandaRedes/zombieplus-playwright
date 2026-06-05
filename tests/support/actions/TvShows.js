const { expect } = require('@playwright/test')

export class TvShows {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="tvshows"]').click()   
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async createButton() {
        await this.page.locator('a[href$="register"]').click()
    }

    async create(tvshow) {
        await this.goForm()
        await this.createButton()
        await this.page.getByLabel('Titulo da série').fill(tvshow.title)
        await this.page.getByLabel('Sinopse').fill(tvshow.overview)

        // await this.page.locator('#select_company_id .react-select__indicator')
        //     .click()

        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click()


        //Para conseguir pegar o elemento pq some ao tentar inspecionar a lista
        // const html = await this.page.content()
        // console.log(html)
        //No --ui after hooks > console > copiar o html, criar arquivo na raiz do projeto e colar
        //Formatar e pesquisar por um item da listagem, netflix

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company }).click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year }).click()

        await this.page.locator('#seasons').fill(tvshow.seasons)

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + tvshow.cover)

        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        }
        await this.submit()
    }

    async search(target) {
        // await this.page.getByPlaceholder('Busque pelo nome')
        //     .fill(target)
        // await this.page.click('.actions button')

        //Clicando no campo para focar no cursor
        const searchInput = this.page.getByPlaceholder('Busque pelo nome')

        // Garante que o campo está visível e limpa qualquer resquício antes de preencher
        await searchInput.waitFor({ state: 'visible' })
        await searchInput.fill(target)

        // Em vez de clicar no botão que pode estar instável, pressionamos 'Enter' direto no teclado, que dispara a busca nativamente pelo formulário
        await searchInput.press('Enter')
        
        // Aguarda o navegador processar a requisição de busca antes do teste avançar
        await this.page.waitForLoadState('networkidle')

        // //Botão de busca
        // await this.page.click('.actions button')
    }

    async tableHave(content) {
        // const rows = this.page.getByRole('row')

        //Busca todas as linhas de dados do corpo da tabela (ignora o cabeçalho)
        const rows = this.page.locator('table tbody tr')

        // Espera até que a primeira linha mude do estado vazio para conter algum texto
        // Isso força o Playwright a aguardar a resposta da API chegar na tela

        await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
    await this.goForm()
    await this.page.getByRole('row', {name: title}).getByRole('button').click()
    await this.page.click('.confirm-removal')
    }
}