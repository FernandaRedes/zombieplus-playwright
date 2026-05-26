// @ts-check
// import { test, expect } from '@playwright/test';
const { test, expect } = require ('@playwright/test');

test('You must register a lead in the waiting queue', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')

  // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  // Contains 
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  // Checkpoint
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  // no input precisa ter o data-testid não apenas id
  // await page.getByTestId('name').fill('teste@tst.com')
  // await page.locator('#name').fill('teste@tst.com')
  // await page.locator('input[name=name]').fill('teste@tst.com')
  // await page.locator('input[placeholder="Seu nome completo"]').fill('teste@tst.com')

  await page.getByPlaceholder('Informe seu nome').fill('Fernanda Rocha')
  await page.getByPlaceholder('Informe seu email').fill('tst@tst.com')

  // await page.click('//button[text()="Quero entrar na fila!"]')
  // await page.getByText('Quero entrar na fila!').click()
  // Trabalhar com escopo, caso tiver um botão com mesmo texto 
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // Quando tem um toaster, usar o comando do test --ui para pegar o texto do modal
  // Truque para pegar o elemento do toaster
  // await page.getByText('seus dados conosco').click()
  // const content = await page.content()
  // console.log(content)
  // volta na interface ui no after hooks content, vai no rodapé console mostra o html do toaster
  // seleciona tudo, copia, vai na raiz do projeto, cria um arquivo chamado modal.html e cola, formata e busca pelo texto

  //Quando o texto é muito grande do elemento
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!' 

  // busca o elemento pela classe toast
  await expect(page.locator('.toast')).toHaveText(message)

  // Toaster foi muito rápido, então aqui garante que vai aparecer na timeline
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})

  // await page.waitForTimeout(10000);

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