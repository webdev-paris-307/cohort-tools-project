const jwt = require("jsonwebtoken")
const User = require("./../models/users.model")

async function isAuthenticated(req, res, next) {
	try {
		let token = req.headers.authorization
		if (!token) {
			return res.status(401).json({ message: "No token found" })
		}
		token = token.replace("Bearer ", "")
		const validToken = jwt.verify(token, process.env.TOKEN_SECRET, {
			algorithms: ["HS256"],
		})
		if (validToken) {
			console.log(validToken)
			const loggedUser = await User.findOne({ email: validToken.email })
			/**
			 * Super important, store the connected user on req.user
			 */
			req.user = loggedUser
			next()
		}
	} catch (error) {
		return res.status(401).json({ message: "Denied.", error: error.message })
	}
}

function isAdmin(req, res, next) {
	if (req.user.role === "Admin") {
		next()
	} else {
		return res.status(401).json({ message: "Unauthorized." })
	}
}

module.exports = { isAuthenticated, isAdmin }
