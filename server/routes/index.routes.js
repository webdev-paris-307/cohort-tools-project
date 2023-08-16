const { Router } = require("express")
const router = Router()

router.use("/students", require("./students.routes"))
router.use("/cohorts", require("./cohorts.routes"))

module.exports = router
