const { PEOPLE } = require("../logic/constants")
const request = require("supertest")
const chai = require("chai")
const expect = chai.expect
chai.use(require("chai-sorted"))

const app = require("../server")
const app_url = "/api/v1/"

// eslint-disable-next-line no-undef
describe("GET /people", () => {
    let people

    // eslint-disable-next-line no-undef
    before(async () => {
        people = await request(app).get(app_url + PEOPLE)
        people = JSON.parse(people.text)
        people = people.data
    })

    // eslint-disable-next-line no-undef
    it("should be an array containing at least one person", (done) => {
        expect(people).to.have.have.own.property("results")
        expect(people.results.length).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total number of people", (done) => {
        expect(people).to.have.have.own.property("count")
        expect(people.count).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Cm)")
        expect(people["totalHeight(Cm)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Ft)")
        expect(people["totalHeight(Ft)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in inches", (done) => {
        expect(people).to.have.have.own.property("totalHeight(In)")
        expect(people["totalHeight(In)"]).to.be.at.least(1)
        done()
    }) 
})

// eslint-disable-next-line no-undef
describe("GET /people filtered by gender (female)", () => {
    let people

    // eslint-disable-next-line no-undef
    before(async () => {
        people = await request(app).get(app_url + PEOPLE + "?gender=female")
        people = JSON.parse(people.text)
        people = people.data
    })

    // eslint-disable-next-line no-undef
    it("should contain only male characters", (done) => {
        people.results.forEach((person) => {
            expect(person).to.have.have.own.property("gender")
            expect(person.gender).to.equal("female")
            expect(person.gender).to.not.equal("male")
        })
        done()
    })

    // eslint-disable-next-line no-undef
    it("should be an array containing at least one person", (done) => {
        expect(people).to.have.have.own.property("results")
        expect(people.results.length).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total number of people", (done) => {
        expect(people).to.have.have.own.property("count")
        expect(people.count).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Cm)")
        expect(people["totalHeight(Cm)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Ft)")
        expect(people["totalHeight(Ft)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in inches", (done) => {
        expect(people).to.have.have.own.property("totalHeight(In)")
        expect(people["totalHeight(In)"]).to.be.at.least(1)
        done()
    }) 
})

//eslint-disable-next-line no-undef
describe("GET /people sorted by gender in ascending order", () => {
    let people

    // eslint-disable-next-line no-undef
    before(async () => {
        people = await request(app).get(app_url + PEOPLE + "?sortBy=gender&sortIn=asc")
        people = JSON.parse(people.text)
        people = people.data
    })

    // eslint-disable-next-line no-undef
    it("should be an array containing at least one person", (done) => {
        expect(people).to.have.have.own.property("results")
        expect(people.results.length).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should be sorted by gender in ascending order", (done) => {
        expect(people.results).to.be.sortedBy("gender", {ascending: true})
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total number of people", (done) => {
        expect(people).to.have.have.own.property("count")
        expect(people.count).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Cm)")
        expect(people["totalHeight(Cm)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("totalHeight(Ft)")
        expect(people["totalHeight(Ft)"]).to.be.at.least(1)
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in inches", (done) => {
        expect(people).to.have.have.own.property("totalHeight(In)")
        expect(people["totalHeight(In)"]).to.be.at.least(1)
        done()
    }) 
})