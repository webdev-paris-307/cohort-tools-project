const router = require("express").Router()
const Student = require("./../models/students.model")
/**
 * All of the routes are prefixed with:
 * ! /api/students
 */

router.get("/", async (req, res, next) => {
	try {
		const allStudents = await Student.find()
		res.json(allStudents)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
