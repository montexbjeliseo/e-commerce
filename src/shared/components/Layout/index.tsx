import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { TopButton } from "../TopButton"

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <TopButton />
            <Footer />
        </>
    )
}