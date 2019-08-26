const request = require("supertest")
const app = require("../server")
const app_url = "/api/v1/"

// eslint-disable-next-line no-undef
describe("GET /test", () => {
    // eslint-disable-next-line no-undef
    it("returns Hello!", () => {
        request(app)
            .get(app_url + "test")
            .expect(200)
    })
})