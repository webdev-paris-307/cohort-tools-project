const router = require("express").Router()
const Student = require("./../models/students.model")
/**
 * All of the routes are prefixed with:
 * ! /api/students
 */

// Get all Students
router.get("/", async (req, res, next) => {
	try {
		const allStudents = await Student.find()
		res.json(allStudents)
	} catch (error) {
		console.log(error)
	}
})

// Get Students of a Cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
	try {
		const studentsOfCohort = await Student.find({ cohort: cohortId })
		res.json(studentsOfCohort)
	} catch (error) {
		next(error)
	}
})

// Get a specific Student
router.get("/:studentId", async (req, res, next) => {
	try {
		const oneStudent = await Student.findById(req.params.studentId)
		res.json(oneStudent)
	} catch (error) {
		next(error)
	}
})

// Create a Student
router.post("/", async (req, res, next) => {
	try {
		const createdStudent = await Student.create(req.body)
		res.status(201).json(createdStudent)
	} catch (error) {
		next(error)
	}
})

// Update a Student
router.put("/:studentId", async (req, res, next) => {
	try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.studentId,
			req.body,
			{ new: true }
		)
		res.json(updatedStudent)
	} catch (error) {
		next(error)
	}
})

// Delete a Student
router.delete("/:studentId", async (req, res, next) => {
	try {
		await Student.findByIdAndDelete(req.params.studentId)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = router
