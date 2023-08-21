import React, { useContext } from "react"
import { UserContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function IsAdmin() {
	const { user, isLoggedIn, isLoading } = useContext(UserContext)
	if (isLoading) {
		return <p>Loading...</p>
	}
	if (!isLoggedIn) {
		return <Navigate to="/login" />
	}

	if (user.role !== "Admin") {
		return <Navigate to="/" />
	}
	return <Outlet />
}

export default IsAdmin
