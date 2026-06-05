//test está sendo chamado de base, um alias
//Criando para facilitar o uso do PageObject
const { test: base, expect } = require('@playwright/test')

//Trocando PajeObject para Custom Action
// const { LandingPage } = require('../page/Leads')
// const { LoginPage } = require('../page/Login')
// const { MoviesPage } = require('../page/Movies')
// const { Toast } = require('../page/Components')

const { Leads } = require('./actions/Leads')
const { Login } = require('./actions/Login')
const { Movies } = require('./actions/Movies')
// const { Toast } = require('./actions/Components')
const { Popup } = require('./actions/Components')
const { Api } = require('./api')
const { TvShows } = require('./actions/TvShows')

//Criando novo contexto do playwright, cria uma extensão do playwright
//O novo contexto page vai substituir o contexto original do playwright
//Porém 
const test = base.extend({
    //Estou sinalizando pro JS que este contexto page vai ter todos os
    //recursos do contexto page original do playwright
    //Porém vou acrescentar objetos que terão acesso a camada PageObject
    page: async ({page}, use) => {
        
        const context = page

        //Trocando PajeObject para Custom Action
        // context['leadingPage'] = new LandingPage(page)
        // context['loginPage'] = new LoginPage(page),
        // context['moviesPage'] = new MoviesPage(page),
        // context['toast'] = new Toast(page)

        //Criando sub objetos
        context['leads'] = new Leads(page)
        context['login'] = new Login(page),
        context['movies'] = new Movies(page),
        // context['toast'] = new Toast(page)
        context['popup'] = new Popup(page),
        context['tvshows'] = new TvShows(page)

        await use(context)
    },
    //Para dar acesso ao request que foi criado no index
    request: async({request}, use) => {
        const context = request
        //Api recebe o contexto original do playwright, customização 
        context['api'] = new Api(request)
        await context['api'].setToken()

        await use(context)
    }
})

export { test, expect }