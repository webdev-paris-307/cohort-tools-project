require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")
const rateLimiter = require("express-rate-limit")
const jwt = require("jsonwebtoken")
const { errorHandler, notFound } = require("./middlewares/error-handling")
const User = require("./models/users.model")
const PORT = 5005

// STATIC DATA
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express()

// Setting limiter
const limiter = rateLimiter({
	windowMs: 1000,
	max: 100,
	standardHeaders: true,
})

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			process.env.ORIGIN,
		],
	})
)
// Helmet, simple, efficient, wear your helmet.
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
	res.sendFile(__dirname + "/views/docs.html")
})

/**
 * Nested routing
 * Any request starting by /api will go in the index route.
 */
app.use("/api", require("./routes/index.routes"))

/**
 * Not found and error handling
 */
app.use(notFound)
app.use(errorHandler)

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
