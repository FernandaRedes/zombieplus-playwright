//test está sendo chamado de base, um alias
//Criando para facilitar o uso do PageObject
const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

//Criando novo contexto do playwright, cria uma extensão do playwright
//O novo contexto page vai substituir o contexto original do playwright
//Porém 
const test = base.extend({
    //Estou sinalizando pro JS que este contexto page vai ter todos os
    //recursos do contexto page original do playwright
    //Porém vou acrescentar objetos que terão acesso a camada PageObject
    page: async ({page}, use) => {
        
        await use({
        // Injeta dentro dele mesmo, toda camada de PageObject
        //Como se fosse uma camada nativa dentro do playwright
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }