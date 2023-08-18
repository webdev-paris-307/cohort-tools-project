const { Schema, model } = require("mongoose")

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			enum: ["Admin", "User"],
			default: "User",
		},
	},
	{ timestamps: true }
)

const User = model("User", userSchema)
module.exports = User
