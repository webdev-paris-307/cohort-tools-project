const { Schema, model, SchemaTypes } = require("mongoose")

const cohortsSchema = new Schema(
	{
		cohortSlug: {
			type: String,
			required: true,
		},
		cohortName: {
			type: String,
			required: true,
		},
		program: {
			type: String,
			enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
		},
		campus: String,
		startDate: {
			type: Date,
			default: Date.now,
		},
		endDate: {
			type: Date,
		},
		inProgress: {
			type: Boolean,
			default: false,
		},
		programManager: {
			type: String,
			required: true,
		},
		leadTeacher: {
			type: String,
			required: true,
		},
		totalHours: {
			type: Number,
			default: 360,
		},
	},
	{
		timestamps: true,
	}
)

const Cohort = model("Cohort", cohortsSchema)

module.exports = Cohort
