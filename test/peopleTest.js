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
        const data = await request(app).get(app_url + PEOPLE)
        people = JSON.parse(data.text)
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
        expect(people.count).to.equal(people.results.length)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Cm)")
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Ft/In)")
        done()
    }) 
})

// eslint-disable-next-line no-undef
describe("GET /people filtered by gender (female) and sorted by name", () => {
    let people

    // eslint-disable-next-line no-undef
    before(async () => {
        const data = await request(app).get(app_url + PEOPLE + "?gender=female&sortBy=name&sortIn=asc")
        people = JSON.parse(data.text)
    })

    // eslint-disable-next-line no-undef
    it("should contain only female characters", (done) => {
        people.results.forEach((person) => {
            expect(person).to.have.have.own.property("gender")
            expect(person.gender).to.equal("female")
            expect(person.gender).to.not.equal("male")
        })
        done()
    })

    // eslint-disable-next-line no-undef
    it("should be sorted by name in ascending order", (done) => {
        expect(people.results).to.be.sortedBy("name", {ascending: true})
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
        expect(people.count).to.equal(people.results.length)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Cm)")
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Ft/In)")
        done()
    })
})

//eslint-disable-next-line no-undef
describe("GET all male characters in film with id=1 sorted by height in ascending order", () => {
    let people

    // eslint-disable-next-line no-undef
    before(async () => {
        const data = await request(app).get(app_url + "/people?episodeId=1&gender=male&sortBy=height&sortIn=asc")
        people = JSON.parse(data.text)
    })

    // eslint-disable-next-line no-undef
    it("should be an array containing at least one person", (done) => {
        expect(people).to.have.have.own.property("results")
        expect(people.results.length).to.be.at.least(1)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain only male characters", (done) => {
        people.results.forEach((person) => {
            expect(person).to.have.have.own.property("gender")
            expect(person.gender).to.equal("male")
            expect(person.gender).to.not.equal("female")
        })
        done()
    })

    // eslint-disable-next-line no-undef
    it("should be sorted by height in ascending order", (done) => {
        people.results.forEach((person, index) => {
            if(index < people.results.length - 1) {
                expect(parseInt(person.height)).to.be.at.most(parseInt(people.results[index + 1].height))
            }
        })
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the total height in centimeters", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Cm)")
        done()
    }) 

    // eslint-disable-next-line no-undef
    it("should contain the total height in feet", (done) => {
        expect(people).to.have.have.own.property("meta")
        expect(people.meta).to.have.have.own.property("totalHeight(Ft/In)")
        done()
    }) 
})