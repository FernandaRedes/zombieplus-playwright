//Não preciso passar o arquivo index.js pq no javaScript e no node é o arquivo principal
const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')

//Importar função abaixo
const { executeSQL } = require('../support/database')

//Delete sem where para garantir a massa, limpando tabela de filmes
//Foi feito isso para evitar problemas de conexões simultâneas (plano free só aceita 5)
test.beforeAll(async () => {
    await executeSQL(`DELETE FROM movies;`)
})

// Não precisa mais usar abaixo, pq foi criado o index que faz isso
// const { LoginPage } = require('../pages/LoginPage')
// const { MoviesPage } = require('../pages/MoviesPage')
// const { Toast } = require('../pages/Components')

// let loginPage
// let moviesPage
// let toast

// test.beforeEach(({ page }) => {
//     loginPage = new LoginPage(page)
//     moviesPage = new MoviesPage(page)
//     toast = new Toast(page)
// })

//test('Must register a new film', async ({ page, play }) => {
test('Must register a new film', async ({ page }) => {
    //Foi criado para testar o contexto se ia dar certo no index, que já foi renomeado para page
    // await play.goto('https://google.com.br')

    //Need to be logged in
    //Preparação de cadastro de filme, encapsulamento/reutilização de código, copia do login.spec
    //Não é duplicação de código

    //Passando a massa de testes Json    
    const movie = data.create

    //Criado gancho no inicio beforeAll para todos os testes
    //Deleta o nome do título da própria massa de testes
    // await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

    // await loginPage.visit()
    // await loginPage.submit('admin@zombieplus.com', 'pwd123')
    // await moviesPage.isLoggedIn()
    // await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    // await toast.containText('Cadastro realizado com sucesso!')

    //Dessa forma abaixo é como se o PageObject fosse nativo do playwright
    //Foi criada a Funçao Do então não precisa mais
    // await page.login.visit()
    // await page.login.submit('admin@zombieplus.com', 'pwd123')
    // await page.login.isLoggedIn()

    //Chamando a função Do que faz login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie)
    // await page.toast.containText('Cadastro realizado com sucesso!')
    // await page.popup.haveText('Cadastro realizado com sucesso!')

    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Must remove a film', async ({ page, request }) => {
    const movie = data.to_remove
    //Pré-cadastro do filme para exclusão
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')
})

//Request consome a api
test('Should not register if the movie title already exist', async ({ page, request }) => {
    const movie = data.duplicate
    await request.api.postMovie(movie)

    // Deleta massa para garantir assertividade
    // await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    //Consumir a api com playwright para criar o pré-cadastro e não ter que passar pelo forms 2x
    //Fazer o teste manual com ferramenta do dev aberto e aba network aberta 

    await page.movies.create(movie)
    // await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
    // await page.popup.haveText('Este conteúdo já encontra-se cadastrado no catálogo')

    await page.popup.haveText(
        `O título '${movie.title}' já consta em nosso catálogo. 
        Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Should not register when the required fields are empty', async ({ page }) => {
    // await page.login.visit()
    // await page.login.submit('admin@zombieplus.com', 'pwd123')
    // await page.login.isLoggedIn()

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        // 'Por favor, informe o título.',
        // 'Por favor, informe a sinopse.',
        // 'Por favor, informe a empresa distribuidora.',
        // 'Por favor, informe o ano de lançamento.'
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})

test('Should search for the therm zombie', async ({ page, request }) => {
    const movies = data.search

    //Vai cadastrar todos os itens do array, o m representa o filme (movie)
    //Vai percorrer os dados que tem na massa, um filme por vez
    movies.data.forEach(async (m) => {
        //Imprime no --ui Expect toBetruthy > console, os títulos do array
        // console.log(m.title)

        //Passa uma massa de teste por vez dentro desse loop
        await request.api.postMovie(m)
    })
        await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

        //movies.input é o termo de busca
        await page.movies.search(movies.input)

        //Poderia deixar esse código aqui pq não é utilizado em outros testes e não precisaria de encapsulamento (que é a camada de ações)
        //Se tiver steps que não são reaproveitados, não precisa fazer o reaproveitamento prematuro
        // const rows = page.getByRole('row')
        // await expect(rows).toContainText(movies.outputs)

        await page.movies.tableHave(movies.outputs) 
})