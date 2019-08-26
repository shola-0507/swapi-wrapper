const { FILMS } = require("../logic/constants")
const request = require("supertest")
const { expect } = require("chai")
const app = require("../server")
const app_url = "/api/v1/"

// eslint-disable-next-line no-undef
describe("GET /films", () => {
    let films
    // eslint-disable-next-line no-undef
    before(async () => {
        films = await request(app).get(app_url + FILMS)
        films = JSON.parse(films.text)
        films = films.data
    })

    // eslint-disable-next-line no-undef
    it("should be an array containing at least one film.", (done) => {
        expect(films.length).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain comments count parameter.", (done) => {
        films.forEach((film) => {
            expect(film).to.have.have.own.property("comment_count")
            expect(film.comment_count).to.be.at.least(0)
        })

        done()
    })

    // eslint-disable-next-line no-undef
    it("should be ordered by release date in descending order.", (done) => {
        films.forEach((film, index) => {
            if (index < films.length - 1) {
                expect(new Date(film.release_date))
                    .to.be.at.most(new Date(films[index + 1].release_date))
            }
        })

        done()
    })
})
