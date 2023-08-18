const router = require("express").Router()
const Cohort = require("./../models/cohorts.model")
const { isAdmin } = require("./../middlewares/authentication")
/**
 * All of the routes are prefixed with:
 * ! /api/cohorts
 */

// Get all Cohorts
// Filter Cohorts by campus / program
router.get("/", (req, res, next) => {
	const { campus, program } = req.query
	const query = {}
	if (campus) {
		const regExpCampus = new RegExp(campus, "i")
		query.campus = regExpCampus
	}
	if (program) {
		const regExpProgram = new RegExp(program, "i")
		query.program = regExpProgram
	}
	Cohort.find(query)
		.then((cohorts) => {
			res.json(cohorts)
		})
		.catch((e) => console.log(e))
})

// Get a specific Cohort
router.get("/:id", async (req, res, next) => {
	try {
		const oneCohort = await Cohort.findById(req.params.id)
		res.json(oneCohort)
	} catch (error) {
		next(error)
	}
})

// Create a Cohort
router.post("/", isAdmin, async (req, res, next) => {
	try {
		const createdCohort = await Cohort.create(req.body)
		res.status(201).json(createdCohort)
	} catch (error) {
		next(error)
	}
})

// Update a Cohort
router.put("/:id", isAdmin, async (req, res, next) => {
	try {
		const updatedCohort = await Cohort.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.json(updatedCohort)
	} catch (error) {
		next(error)
	}
})

// Delete a Cohort
router.delete("/:id", isAdmin, async (req, res, next) => {
	try {
		await Cohort.findByIdAndDelete(req.params.id)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = router
