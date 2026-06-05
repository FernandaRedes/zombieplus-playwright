const { expect } = require('@playwright/test')

export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        //Retorna o status code ok é verdadeiro (200)
        expect(response.ok()).toBeTruthy()

        //Puxando valor do token e transformando texto em Json
        const body = JSON.parse(await response.text())

        // console.log(await response.text())

        //Pega o token do login
        // console.log(body.token)
        //Passando o identificador do token
        this.token = 'Bearer ' + body.token

        // console.log(this.token)
    }

    async getCompanyIdByName(companyName) {
        const response = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization: this.token
            },
            //Filtro de nome da empresa
            params: {
                name: companyName
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())

        //Pegando dentro do array data a primeira posição que traz o id
        return body.data[0].id
    }

    async postMovie(movie) {
        const companyId = await this.getCompanyIdByName(movie.company)

        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            //Recebe o corpo da requisição
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        expect(response.ok()).toBeTruthy()
    }

       async postTvShow(tvshow) {
        const companyId = await this.getCompanyIdByName(tvshow.company)

        const response = await this.request.post('http://localhost:3333/tvshows', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: tvshow.title,
                overview: tvshow.overview,
                company_id: companyId,
                release_year: tvshow.release_year,
                featured: tvshow.featured,
                seasons: tvshow.seasons
            }
        })
        expect(response.ok()).toBeTruthy()
    }

    async postLead(lead) {
        const response = await this.request.post('http://localhost:3333/leads', {
            headers: {
                Authorization: this.token,
                Accept: 'application/json, text/plain, */*'
            },
            data: {
                name: lead.name,
                email: lead.email,
            }
        })
        expect(response.ok()).toBeTruthy()
    }
}