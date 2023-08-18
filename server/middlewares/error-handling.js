function notFound(req, res, next) {
	res
		.status(404)
		.json({ message: `The requested route ${req.originalUrl} does not exist` })
}

function errorHandler(error, req, res, next) {
	console.error(
		`
  ERROR ${error.name} on ${req.path}
  Message: ${error.message}

  Details:
  `,
		error
	)

	if (!res.headersSent) {
		res.status(500).json({
			name: error.name,
			message: error.message,
			fullError: error,
		})
	}
}

module.exports = { notFound, errorHandler }
