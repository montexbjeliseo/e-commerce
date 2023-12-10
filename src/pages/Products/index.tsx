import { useQuery } from "react-query";
import { API_ENDPOINTS, IMAGE_PLACEHOLDER, QUERY_KEYS } from "../../constants";
import "./styles.css"
import { Loading } from "../../shared/components/Loading";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Link } from "react-router-dom";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    },
    images: string[]
}

export const ProductsPage = () => {

    const { data, isLoading, isError } = useQuery(QUERY_KEYS.PRODUCTS, () => {
        const response = fetch(API_ENDPOINTS.PRODUCTS);
        return response.then((res) => res.json());
    });

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <>
            <section className="container center">
                <h1 className="title">Products</h1>
                <div className="product-container">
                    <aside>
                        <h2>Filters</h2>
                        <ul>
                            <li>title</li>
                            <li>price range</li>
                            <li>category</li>
                        </ul>
                    </aside>
                    <main>
                        <div className="product-list">
                            {(data as Product[]).map((product) => (
                                <div key={product.id} className="product-card">
                                    <img src={product.images[0]} alt={product.title} title={product.title}  onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} />
                                    <p className="product-title">{product.title}</p>
                                    <p>${product.price}</p>
                                    <div className="overlay">
                                        <Link to={`/products/${product.id}`} title={product.title}>
                                            View Details
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </section>
        </>

    )
}