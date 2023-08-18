const { Router } = require("express")
const { isAuthenticated } = require("../middlewares/authentication")
const router = Router()

/**
 * All routes are prefixed by:
 * ! /api
 *
 * Requests with /api/students will go to the students route
 * Requests with /api/cohorts will go to the cohorts route
 * Request with /api/toto will leave this sub route, and go to the next middleware (probably a 404!)
 *
 */

router.use("/auth", require("./auth.routes"))

/**
 * Client need to send a valid JWT token to access the students/cohorts routes
 */
router.use(isAuthenticated)
router.use("/students", require("./students.routes"))
router.use("/cohorts", require("./cohorts.routes"))

module.exports = router
