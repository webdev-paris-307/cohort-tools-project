import React, { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../context/AuthContext"

function IsLoggedIn() {
	const { isLoggedIn, isLoading } = useContext(UserContext)

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (!isLoggedIn) {
		return <Navigate to="/login" />
	}

	return <Outlet />
}

export default IsLoggedIn
