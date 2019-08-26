const { COMMENTS, FILMS } = require("../logic/constants")
const request = require("supertest")
const chai = require("chai")
const expect = chai.expect
chai.use(require("chai-sorted"))

const app = require("../server")
const app_url = "/api/v1/"
let id = 1

// eslint-disable-next-line no-undef
describe("GET all /Comments", () => {
    let comment, res, films
    // eslint-disable-next-line no-undef
    before( async () => {
        try {
            films = await request(app).get(app_url + FILMS)
            films = JSON.parse(films.text)
            films = films.data
            res  = await request(app).post(app_url + "film/" + id + "/" + COMMENTS)
                .type("json").send({ comment: "Heyyy Olushola" })
        } catch (error) {
            console.log(error.message)
        }   
    })

    // eslint-disable-next-line no-undef
    it("should insert a comment for a movie, if the movie id exists", (done) => {
        expect(res.status).to.equal(200)
        done()
    })

    // eslint-disable-next-line no-undef
    it("should contain the public IP address of the commenter", (done) => {
        comment = JSON.parse(res.text)
        comment = comment.data
        expect(comment).to.have.have.own.property("user_id")
        done()
    })

    // eslint-disable-next-line no-undef
    it("should increase the number of comments for the movie by one", (done) => {
        let old_film_data = films.filter((film) => {
            return film.episode_id === id
        })

        request(app).get(app_url + FILMS).end((err, films) => {
            films = JSON.parse(films.text)
            films = films.data

            films.forEach((film) => {
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
            .post(app_url + "film/" + id + "/" + COMMENTS)
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
        request(app).get(app_url + "film/" + id + "/" + COMMENTS).end((err, comments) => {
            comments = JSON.parse(comments.text)
            comments = comments.data
            expect(comments).to.be.sortedBy("createdAt", {descending: true})
            done()
        })
    })
})