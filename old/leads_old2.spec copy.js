// @ts-check
// import { test, expect } from '@playwright/test';
const { test, expect } = require ('@playwright/test');

test('You must register a lead in the waiting queue', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // Agrupar por funções

  
  // openLeadModal
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  // submitLeadForm
  await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')
  await page.getByPlaceholder('Informe seu email').fill('tst@tst.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // toastHaveText
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!' 
  await expect(page.locator('.toast')).toHaveText(message)
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})

});

// Copia o teste inteiro de cima e cola

test('Do not register with an incorrect email address', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')
  await page.getByPlaceholder('Informe seu email').fill('tst.com.br')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // Rodar no --ui after hooks context locator e digitar "getByText('email incorreto')" <enter>
  // Validar o localizador ao invés de usar o inspector
  // Também pode usar o inspector junto com --ui e passar "locator('.alert')"

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  // await page.waitForTimeout(10000);

});

test('Do not register if the name is blank', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu email').fill('tst@com.br')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('Do not register if the email is blank', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('Do not register if all fields are blank', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // Valida as duas mensagens como um array
  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});