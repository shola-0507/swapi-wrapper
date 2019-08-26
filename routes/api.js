const express = require("express")
const router = express.Router()
const filmsController = require("../controllers/filmsController")
const commentsController = require("../controllers/commentsController")
const validationController = require("../controllers/validationController")
const peopleController = require("../controllers/peopleController")

router.get("/test", (req, res) => res.send("Hello!")) // simple route test to ensure nodejs is configured properly
router.get("/films", filmsController.getFilms)

router.post("/film/:id/comments", validationController.validateComments, commentsController.createComment)
router.get("/film/:id/comments", commentsController.getComments)
router.get("/film/:id/people", peopleController.getFilmCharacters)

router.get("/people", peopleController.getAllCharacters)

module.exports = router