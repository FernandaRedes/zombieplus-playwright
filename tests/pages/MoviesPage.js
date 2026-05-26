const { expect } = require('@playwright/test')


export class MoviesPage {

    constructor(page) {

        this.page = page
    }

    // Como ao logar vai para página de Movies, pelo conceito do pageobject precisa ser separado da tela de loginpage
    async isLoggedIn() {
        //Aguarda até que a pág esteja em um estado específico antes de verificar a url, fica ocioso até o próx tráfego de rede
        await this.page.waitForLoadState('networkidle')

        //Uma forma de garantir que está na área logada
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()

        //Verifica que na url tem o admin 
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$="register"]').click()

        // Uma forma de encontrar o título
        // await this.page.locator('#title').fill(title)

        //Quando no CSS existe o label que é o elemento pai do input
        //  <label for=title que tem o mesmo nome que o id, o html cria uma conexão entre os elementos
        // Com isso posso buscar o campo pelo label
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        //Para conseguir pegar o elemento pq some ao tentar inspecionar a lista
        // const html = await this.page.content()
        // console.log(html)
        //No --ui after hooks > console > copiar o html, criar arquivo na raiz do projeto e colar
        //Formatar e pesquisar por um item da listagem, netflix

        //Filtrar o texto desejado
        await this.page.locator('.react-select__option')
            .filter({ hasText: company }).click()


        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year }).click()

        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

}