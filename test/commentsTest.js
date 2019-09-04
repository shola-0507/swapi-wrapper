const request = require("supertest")
const chai = require("chai")
const expect = chai.expect
chai.use(require("chai-sorted"))

const app = require("../server")
const app_url = "/api/v1/"
let id = 1

// eslint-disable-next-line no-undef
describe("GET all /Comments", () => {
    let comment, status
    // eslint-disable-next-line no-undef
    before( async () => {
        try {
            const commentData  = await request(app).post(app_url + "films/" + id + "/comments")
                .type("json").send({ comment: "Heyyy Olushola" })
            
            status = commentData.status
            comment = JSON.parse(commentData.text)

        } catch (error) {
            console.log(error.message)
        }   
    })

    // eslint-disable-next-line no-undef
    it("should insert a comment for a movie, if the movie id exists", (done) => {
        expect(status).to.equal(200)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the public IP address of the commenter", (done) => {
        expect(comment.results).to.have.have.own.property("user_id")
        done()
    })

    // eslint-disable-next-line no-undef
    it("should sort the comments for each film by created date", (done) => {
        request(app).get(app_url + "films/" + id + "/comments").end((err, data) => {
            const comments = JSON.parse(data.text)
            expect(comments.results).to.be.sortedBy("createdAt", {descending: true})
            done()
        })
    })
})