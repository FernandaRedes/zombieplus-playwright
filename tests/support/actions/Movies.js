const { expect } = require('@playwright/test')


// export class MoviesPage {
export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    // async create(title, overview, company, release_year) {
    async create(movie) {

        await this.goForm()

        // Uma forma de encontrar o título
        // await this.page.locator('#title').fill(title)

        //Quando no CSS existe o label que é o elemento pai do input
        //  <label for=title que tem o mesmo nome que o id, o html cria uma conexão entre os elementos
        // Com isso posso buscar o campo pelo label
        //Mudando args dentro do create
        // await this.page.getByLabel('Titulo do filme').fill(title)
        // await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        //Para conseguir pegar o elemento pq some ao tentar inspecionar a lista
        // const html = await this.page.content()
        // console.log(html)
        //No --ui after hooks > console > copiar o html, criar arquivo na raiz do projeto e colar
        //Formatar e pesquisar por um item da listagem, netflix

        //Filtrar o texto desejado
        // await this.page.locator('.react-select__option')
        //     .filter({ hasText: company }).click()

         await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company }).click()


        await this.page.locator('#select_year .react-select__indicator')
            .click()

        // await this.page.locator('.react-select__option')
        //     .filter({ hasText: release_year }).click()

         await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year }).click()

        //Concatenando caminho da pasta onde fica os covers
        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + movie.cover)

        //Se featured for true clica no destaque
        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async tableHave(content) {
         //row busca linhas dentro do html que são as tr no html
        const rows = this.page.getByRole('row')
        //Retorna os 3 textos
        await expect(rows).toContainText(content)
    }

    //Não foi componentizado pq cada pág tem sua estrutura de alert
    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
    // Xpath > //td[text()="A Noite dos mortos-vivos"]/..//button
    //Quero uma linha do html de uma tabela cujo nome é 
    await this.page.getByRole('row', {name: title}).getByRole('button').click()
    await this.page.click('.confirm-removal')
    }
}