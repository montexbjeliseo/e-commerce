import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar"
import { Footer } from "../Footer"
import { TopButton } from "../TopButton"

export const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <TopButton />
            <Footer />
        </>
    )
}