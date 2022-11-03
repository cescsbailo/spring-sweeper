import { useAuth } from "./AuthProvider"

import { Link, Outlet, Navigate } from "react-router-dom"

export const HomeLayout = () => {
    const { user } = useAuth()

    if (user) {
        return <Navigate to="/games/newGame" />
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Outlet />
        </div>
    )
}