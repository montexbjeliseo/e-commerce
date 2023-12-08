import { Link } from "react-router-dom"

export const NotFoundPage = () => {

    return (
        <div>
            <h1>Error 404 - Not Found</h1>
            <p>Page not found. Go back to <Link to="/">Home</Link></p>
        </div>
    )
}