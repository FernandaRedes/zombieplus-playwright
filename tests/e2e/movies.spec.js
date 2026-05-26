//Não preciso passar o arquivo index.js pq no javaScript e no node é o arquivo principal
const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

//Importar função abaixo
const {executeSQL} = require('../support/database')

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

    //Deleta o nome do título da própria massa de testes
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

    // await loginPage.visit()
    // await loginPage.submit('admin@zombieplus.com', 'pwd123')
    // await moviesPage.isLoggedIn()
    // await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    // await toast.containText('Cadastro realizado com sucesso!')

    //Dessa forma abaixo é como se o PageObject fosse nativo do playwright
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})