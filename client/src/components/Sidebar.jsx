import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/AuthContext"
function Sidebar() {
	const location = useLocation()
	const { isLoggedIn, authenticateUser } = useContext(UserContext)

	function logout() {
		localStorage.removeItem("token")
		authenticateUser()
	}
	return (
		<div className="sidebar bg-white text-black p-4">
			<ul>
				{isLoggedIn ? (
					<>
						<li>
							<Link
								to="/dashboard"
								className={location.pathname === "/dashboard" ? "active" : ""}>
								Cohorts
							</Link>
						</li>
						<li>
							<Link
								to="/students"
								className={location.pathname === "/students" ? "active" : ""}>
								Students
							</Link>
						</li>

						<li>
							<button onClick={logout}>Logout</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default Sidebar
