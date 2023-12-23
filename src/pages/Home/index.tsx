import { useQuery } from "react-query"
import { fetchCategories, fetchProducts } from "../../api"
import { HeroCarousel } from "./HeroCarousel"
import { HeroProductCard } from "./HeroProductCard"
import { Product } from "../../types"
import { APP_ROUTES, QUERY_KEYS } from "../../constants"
import { CategoryCard } from "../../shared/components/CategoryCard"
import styled from "styled-components"
import { LatestProductCard } from "./LatestProductCard"
import { Link } from "react-router-dom"
import { Loading } from "../../shared/components/Loading"
import { ErrorMessage } from "../../shared/components/ErrorMessage"

const CategoryOfMonth = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    padding: 0 20px;
    list-style: none;
    list-style-type: none;
`;

const ProductArrivals = styled.ul`
    list-style: none;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-direction: column;
    gap: 20px;
`;

const SectionTitle = styled.h1`
    padding-top: 50px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: lighter;
    opacity: 0.7;
`;

const SectionDescription = styled.p`
    text-align: center;
    font-size: 1.2rem;
    padding: 10px 0;
`;

const Banner = styled.div`
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;

    &.primary {
        background: #0D0D0D;
        a {
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;

        }
    }
    &.secondary {
        background: #a5a5a5;
        a {
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;
            
        }
    }
`;

export const HomePage = () => {

    const { data: products, isLoading, isError } = useQuery(QUERY_KEYS.PRODUCTS, () => fetchProducts({}));
    const { data: categories } = useQuery(QUERY_KEYS.CATEGORIES, () => fetchCategories());

    if(isLoading){
        return <Loading />
    }

    if(isError){
        return <ErrorMessage />
    }

    return (
        <>
            <section className="container">
                {products ? (
                    <HeroCarousel>
                        {(products as Product[]).slice(0, 3).map(product => (
                            <HeroProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </HeroCarousel>
                ) : null}
            </section>
            <section className="container bg-gray">
                <SectionTitle>Categories of the Month</SectionTitle>
                <SectionDescription>Our top selling categories</SectionDescription>
                <div>
                    {categories ? (
                        <CategoryOfMonth>
                            {(categories as any[]).slice(0, 4).map(category => (
                                <CategoryCard
                                    key={category.id}
                                    data={category}
                                    onDelete={() => null}
                                    onEdit={() => null}
                                />
                            ))}
                        </CategoryOfMonth>
                    ) : null}
                </div>
            </section>
            <Banner className="secondary">
                <Link to={APP_ROUTES.CATEGORIES}>View all categories</Link>
            </Banner>
            <section className="container">
                <SectionTitle>Latest Arrivals</SectionTitle>
                <SectionDescription>Our latest product arrivals</SectionDescription>
                <div>
                    {products ? (
                        <ProductArrivals>
                            {(products as Product[]).slice(products.length - 4, products.length).map(product => (
                                <LatestProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ProductArrivals>
                    ) : null}
                </div>
            </section>
            <Banner className="primary">
                <Link to={APP_ROUTES.PRODUCTS}>View all products</Link>
            </Banner>
        </>
    )
}