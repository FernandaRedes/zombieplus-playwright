const { test, expect } = require('../support')

//Não precisa por causa do index
// const { test, expect } = require('@playwright/test')
// const { LoginPage } = require('../pages/LoginPage')
// const { MoviesPage } = require('../pages/MoviesPage')
// const { Toast } = require('../pages/Components')
// //Acima importa fazendo o require

// let loginPage
// let moviesPage
// let toast

// test.beforeEach(({ page }) => {
//     loginPage = new LoginPage(page)
//     moviesPage = new MoviesPage(page)
//     toast = new Toast(page)
// })

test('Log in as an admin', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('Not log in with wrong password', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '123456')

    // const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    // await page.toast.containText(message)

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
})

test('Not log in if the email is invalid', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('www.test.com', '123456')
    await page.login.alertHaveText('Email incorreto')
})

test('Not log in if the email is blank', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '123456')
    await page.login.alertHaveText('Campo obrigatório')
})

test('Not log in if the password is blank', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('fernanda@teste.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('Not log in if all fields are blank', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

