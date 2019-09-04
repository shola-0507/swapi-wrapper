const express = require("express")
const router = express.Router()
const filmsController = require("../controllers/filmsController")
const commentsController = require("../controllers/commentsController")
const validationMiddleware = require("../middleware/validationController")
const peopleController = require("../controllers/peopleController")

router.get("/test", (req, res) => res.send("Hello!"))
router.get("/films", filmsController.getFilms)

router.post("/films/:id/comments", validationMiddleware.validateComments, commentsController.createComment)
router.get("/films/:id/comments", commentsController.getComments)

router.get("/people", peopleController.getCharacters)

module.exports = router