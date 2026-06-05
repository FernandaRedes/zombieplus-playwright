const { test, expect } = require('../support')

let faker
let registeredLeads = []

test.beforeAll(async ({ request }) => {
  const fakerModule = await import('@faker-js/faker')
  faker = fakerModule.faker

  for (let i = 0; i < 10; i++) {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await request.api.postLead({
      name: leadName,
      email: leadEmail
    })

    registeredLeads.push({ name: leadName, email: leadEmail })
  }
})

test('Find leads by email', async ({ page }) => {

  //Pega o primeiro lead cadastrado na massa
  const targetLead = registeredLeads[0]

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.leads.visitManagement()

  //Passando o email do lead para busca
  await page.leads.searchManagement(targetLead.email)

  //Validar se trouxe o lead na busca
  await page.leads.tableHave([targetLead.name])
})

test('Must remove a lead', async ({ page }) => {
  const targetLead = registeredLeads[5]

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.leads.visitManagement()
  await page.leads.remove(targetLead.email)
  await page.popup.haveText('Lead removido com sucesso.')
})

test('Validate message empty list of leads', async ({ page }) => {

  // Termo completamente aleatório que NUNCA vai existir no banco
  // const nonExistingEmail = `empty_state_${faker.string.uuid()}@invalid.com`
  const nonExistingEmail = `empty_${faker.string.uuid()}@nada.com`

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.leads.visitManagement()

  //Busca por termo inexistente
  await page.leads.searchManagement(nonExistingEmail)
  await page.leads.emptyListHaveText('Nenhum lead encontrado!')
})
