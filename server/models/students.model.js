const { Schema, model, SchemaTypes } = require("mongoose")

const studentsSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			required: true,
			minLength: 2,
			type: String,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		linkedinUrl: {
			type: String,
			default: "",
		},
		languages: {
			type: [String],
			enum: [
				"English",
				"French",
				"Spanish",
				"German",
				"Dutch",
				"Other",
				"Portuguese",
			],
		},
		program: {
			type: String,
			enum: ["UX/UI", "Web Dev", "Data Analytics", "Cybersecurity"],
		},
		background: {
			type: String,
			default: "",
		},
		image: {
			type: String,
			default: "https://i.imgur.com/r8bo8u7.png",
		},
		cohort: {
			type: Schema.Types.ObjectId,
			// type: SchemaTypes.ObjectId
			ref: "",
		},
		projects: [String],
	},
	{
		timestamps: true,
	}
)

const Student = model("Student", studentsSchema)

module.exports = Student
