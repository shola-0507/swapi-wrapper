const request = require("supertest")
const chai = require("chai")
const expect = chai.expect
chai.use(require("chai-sorted"))

const app = require("../server")
const app_url = "/api/v1/"
let id = 1

// eslint-disable-next-line no-undef
describe("GET all /Comments", () => {
    let comment, status, films
    // eslint-disable-next-line no-undef
    before( async () => {
        try {
            const filmData = await request(app).get(app_url + "films")
            films = JSON.parse(filmData.text)
            
            const commentData  = await request(app).post(app_url + "film/" + id + "/comments")
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
    it("should increase the number of comments for the movie by one", (done) => {
        const old_film_data = films.results.filter((film) => {
            return film.episode_id === id
        })

        request(app).get(app_url + "films").end((err, data) => {
            const films = JSON.parse(data.text)
            films.results.forEach((film) => {
                if(film.episode_id === id) {
                    expect(film.comment_count).to.equal(old_film_data[0]["comment_count"] + 1)
                }
            })
            done()
        })
    })

    // eslint-disable-next-line no-undef
    it("should return a 404 status code, if the movie id isnt associated with any movie", (done) => {
        let id = 30
        request(app)
            .post(app_url + "film/" + id + "/comments")
            .type("json")
            .send({
                comment: "Heyyy Olushola"
            })
            .end((err, res) => {
                expect(res.status).to.equal(404)
                done()
            })
    })

    // eslint-disable-next-line no-undef
    it("should sort the comments for each film by created date", (done) => {
        request(app).get(app_url + "film/" + id + "/comments").end((err, data) => {
            const comments = JSON.parse(data.text)
            expect(comments.results).to.be.sortedBy("createdAt", {descending: true})
            done()
        })
    })
})