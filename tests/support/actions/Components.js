const { expect } = require('@playwright/test')

// Se chama apenas toast porque é um componente, não uma página
//Toast foi substituido por um popup/modal
// export class Toast {

//     //Preciso instanciar a classe
//     constructor(page) {
//         this.page = page
//     }

//     async containText(message) {
//         const toast = this.page.locator('.toast')
//         // await expect(this.page.locator('.toast')).toHaveText(message)
//         // await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 })

//         await expect(toast).toContainText(message)
//         await expect(toast).toBeHidden({ timeout: 10000 })
//         // Similar ao toBeHidden, not.toBeVisible garante que não está visível mas pode existir no html
//         // toBeHidden garante que não faz parte do html
//         // await expect(toast).not.toBeVisible({ timeout: 5000 })
//     }
// }

export class Popup {
    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        // const toast = this.page.locator('.toast')
        // await expect(this.page.locator('.toast')).toHaveText(message)
        // await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 })

        // await expect(toast).toContainText(message)
        // await expect(toast).toBeHidden({ timeout: 10000 })
        // Similar ao toBeHidden, not.toBeVisible garante que não está visível mas pode existir no html
        // toBeHidden garante que não faz parte do html
        // await expect(toast).not.toBeVisible({ timeout: 5000 })

        //Mudou toast para modal
        const element = this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(message)
    }

}