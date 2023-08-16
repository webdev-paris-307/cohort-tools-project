const router = require("express").Router()
const Cohort = require("./../models/cohorts.model")

/**
 * All of the routes are prefixed with:
 * ! /api/cohorts
 */

router.get("/", (req, res, next) => {
	Cohort.find()
		.then((ghrzjklegaz) => {
			res.json(ghrzjklegaz)
		})
		.catch((e) => console.log(e))
})

module.exports = router
