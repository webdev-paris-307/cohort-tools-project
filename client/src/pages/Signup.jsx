import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function Signup() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()
		const userToCreate = { email, password }

		axios
			.post(`${API_URL}/api/auth/signup`, userToCreate)
			.then((response) => {
				navigate("/login")
			})
			.catch((e) => {
				console.log(e)

				if (e.response) {
					setError(e.response.data.message)
					setTimeout(() => {
						setError("")
					}, 3000)
				}
			})
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id="password"
				/>
			</div>
			{error && <p className="error">{error}</p>}
			<button>Sign up</button>
		</form>
	)
}

export default Signup
