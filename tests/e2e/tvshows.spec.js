//Não preciso passar o arquivo index.js pq no javaScript e no node é o arquivo principal
const { test, expect } = require('../support')
const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows;`)
})

test('Must register a new tv show', async ({ page }) => {  
    const tvshow = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goForm()

    await page.tvshows.create(tvshow)
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)
})

test('Must remove a tv show', async ({ page, request }) => {
    const tvshow = data.to_remove
    
    await request.api.postTvShow(tvshow)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goForm()

    await page.tvshows.remove(tvshow.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('Should not register if the tv show title already exist', async ({ page, request }) => {
    const tvshow = data.duplicate

    await request.api.postTvShow(tvshow)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goForm()
    
    await page.tvshows.create(tvshow)
    await page.popup.haveText(
        `O título '${tvshow.title}' já consta em nosso catálogo. 
        Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Should not register when the required fields are empty', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.goForm()
    await page.tvshows.createButton()
    await page.tvshows.submit()

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
})

test('Should search for the therm Dead', async ({ page, request }) => {
    const tvshows = data.search

    for (const tv of tvshows.data) {
        await request.api.postTvShow(tv)
    }
        await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        await page.tvshows.goForm()
        await page.tvshows.search(tvshows.input)
        await page.tvshows.tableHave(tvshows.outputs) 
})