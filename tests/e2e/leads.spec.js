// // @ts-check
// const { test, expect } = require('@playwright/test')
const { test, expect } = require('../support')
// const { faker } = require('@faker-js/faker')

// import { faker } from '@faker-js/faker'

//Não precisa mais por causa do index que foi criado
// const { LandingPage } = require('../pages/LandingPage')
// const {Toast} = require('../pages/Components')

// // let = variável, aqui cria uma variável vazia
// let landingPage
// let toast
let leadName
let leadEmail

// //Gancho que vai ser executado antes de cada teste que vai receber
// test.beforeEach(async ({ page }) => {
//   // Instanciando a classe que representa a página principal
//   landingPage = new LandingPage(page)
//   toast = new Toast(page)
// })

// Definindo a massa de testes, roda 1x para todos os testes
// Como ele cria no primeiro teste, fica a mesma massa pro segundo
test.beforeAll(async () => {
  const { faker } = await import('@faker-js/faker')
  leadName = faker.person.fullName()
  leadEmail = faker.internet.email()
})

test('You must register a lead in the waiting queue', async ({ page }) => {

  //Alterado por causa do index que foi criado
  // await landingPage.visit()
  // await landingPage.openLeadModal()
  // await landingPage.submitLeadForm(leadName, leadEmail)

  // Trocando PageObject para Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm(leadName, leadEmail)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  // const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  // await toast.containText(message)
  //Toast foi alterado por um modal
  // await page.toast.containText(message)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)
});

// Request faz requisições http na api da aplicação
test('You should not register if the email already exists', async ({ page, request }) => {

  // Pré cadastra o lead antes via api
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  //Status code de sucesso
  expect(newLead.ok()).toBeTruthy()
  
   // Trocando PageObject para Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm(leadName, leadEmail)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  // const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  // await page.toast.containText(message)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
});

test('Do not register with an incorrect email address', async ({ page }) => {
  // await page.goto('http://localhost:3000')

  // await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(
  //   page.getByTestId('modal').getByRole('heading')
  // ).toHaveText('Fila de espera')

  // await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')
  // await page.getByPlaceholder('Informe seu email').fill('tst.com.br')

  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  // Rodar no --ui after hooks context locator e digitar "getByText('email incorreto')" <enter>
  // Validar o localizador ao invés de usar o inspector
  // Também pode usar o inspector junto com --ui e passar "locator('.alert')"

  // await expect(page.locator('.alert')).toHaveText('Email incorreto')
  // await page.waitForTimeout(10000);

  //Trocando PageObject por Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm('Fernanda Rocha', 'fernanda.tst.com')

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Fernanda Rocha', 'fernanda.tst.com')
  // Colocar o target na classe LandingPage
  // await expect(page.locator('.alert')).toHaveText('Email incorreto')

  //Trocando PageObject por Custom Action
  // await page.landing.alertHaveText('Email incorreto')

  await page.leads.alertHaveText('Email incorreto')

});

test('Do not register if the name is blank', async ({ page }) => {
  // await page.goto('http://localhost:3000')

  // await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(
  //   page.getByTestId('modal').getByRole('heading')
  // ).toHaveText('Fila de espera')

  // await page.getByPlaceholder('Informe seu email').fill('tst@com.br')

  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  // await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

  //Trocando PageObject por Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm('', 'fernanda@tst.com')

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'fernanda@tst.com')

  // await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  
  //Trocando PageObject por Custom Action
  // await page.landing.alertHaveText('Campo obrigatório')

   await page.leads.alertHaveText('Campo obrigatório')

});

test('Do not register if the email is blank', async ({ page }) => {
  // await page.goto('http://localhost:3000')

  // await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(
  //   page.getByTestId('modal').getByRole('heading')
  // ).toHaveText('Fila de espera')

  // await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')

  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  // await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

  //Trocando PageObject por Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm('Fernanda Rocha', '')

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Fernanda Rocha', '')

  // await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  
  //Trocando PageObject por Custom Action
  // await page.landing.alertHaveText('Campo obrigatório')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('Do not register if all fields are blank', async ({ page }) => {
  // await page.goto('http://localhost:3000')

  // await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(
  //   page.getByTestId('modal').getByRole('heading')
  // ).toHaveText('Fila de espera')

  // await page.getByTestId('modal')
  //   .getByText('Quero entrar na fila!').click()

  // // Valida as duas mensagens como um array
  // await expect(page.locator('.alert')).toHaveText([
  //   'Campo obrigatório',
  //   'Campo obrigatório'
  // ])

  //Trocando PageObject por Custom Action
  // await page.landing.visit()
  // await page.landing.openLeadModal()
  // await page.landing.submitLeadForm('', '')

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  // await expect(page.locator('.alert')).toHaveText([
  //   'Campo obrigatório',
  //   'Campo obrigatório'
  // ])

  // Trocando PageObject por Custom Action
  // await page.landing.alertHaveText([

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});