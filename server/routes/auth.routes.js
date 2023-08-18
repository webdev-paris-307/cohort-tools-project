const User = require("../models/users.model")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require("../middlewares/authentication")
const rounds = 12

// function handleSubmit (e) {
//   e.preventDefault()
//   const newUser = {email: emailState, password: passwordState}
//   axios.post('backendUrl', newUser)
// }

router.post("/signup", async (req, res, next) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "We need an email and a password." })
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Provide a valid email address." })
		}

		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				message:
					"Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
			})
		}

		const existingUser = await User.findOne({ email: email })
		if (existingUser) {
			return res.status(400).json({ message: "This email is already used." })
		}
		/**
		 * Generate a new salt from the rounds
		 */

		const salt = await bcrypt.genSalt(rounds)

		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = await User.create({ email, password: hashedPassword })
		const displayedUser = {
			email: newUser.email,
			role: newUser.role,
			_id: newUser._id,
		}
		res.status(201).json({ message: "Success!", user: displayedUser })
	} catch (error) {
		next(error)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body
		// Checking for email, password in req.body
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Please provide an email/password combo" })
		}

		// Try to find one user w/ same email, select email and password
		const existingUser = await User.findOne(
			{ email },
			{ password: 1, email: 1 }
		)
		if (!existingUser) {
			return res.status(400).json({ message: "Wrong credentials" })
		}
		// console.log(existingUser)
		// Using bcrypt to compare the user provided apssword and the
		// hash in my database.
		const goodPassword = await bcrypt.compare(password, existingUser.password)
		if (!goodPassword) {
			return res.status(400).json({ message: "Wrong credentials" })
		}

		/**
		 * Generate a token
		 */
		const payload = { email: existingUser.email }
		const generatedToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
			algorithm: "HS256",
			expiresIn: "6h",
		})

		res.json({ token: generatedToken })
	} catch (error) {
		next(error)
	}
})

router.get("/verify", isAuthenticated, (req, res, next) =>
	res.json({ user: req.user })
)

module.exports = router
