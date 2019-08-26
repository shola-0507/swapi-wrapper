const request = require("supertest")
const app = require("../server")
const app_url = "/api/v1/"

// eslint-disable-next-line no-undef
describe("GET /test", () => {
    // eslint-disable-next-line no-undef
    it("returns Hello!", (done) => {
        request(app)
            .get(app_url + "test")
            .expect(200, done)
    })
})

// eslint-disable-next-line no-undef
describe("GET /films", () => {
    // eslint-disable-next-line no-undef
    it("returns all films!", (done) => {
        request(app)
            .get(app_url + "/films")
            .expect(200, done)
    })
})

// eslint-disable-next-line no-undef
describe("GET /people", () => {
    // eslint-disable-next-line no-undef
    it("returns all people!", (done) => {
        request(app)
            .get(app_url + "/people")
            .expect(200, done)
    })
})