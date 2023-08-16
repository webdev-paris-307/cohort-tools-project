const mongoose = require("mongoose")
mongoose
	.connect("mongodb://localhost:27017/cohorts-database")
	.then((db) => {
		console.log(`Connected to ${db.connection.name}`)
	})
	.catch((err) => console.log(err))
