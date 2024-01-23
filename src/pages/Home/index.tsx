import { useQuery } from "react-query"
import { fetchCategories, fetchProducts } from "../../api"
import { HeroCarousel } from "./HeroCarousel"
import { HeroProductCard } from "./HeroProductCard"
import { Product } from "../../types"
import { APP_ROUTES, QUERY_KEYS } from "../../constants"
import { LatestProductCard } from "./LatestProductCard"
import { Link } from "react-router-dom"
import { Loading } from "../../shared/components/Loading"
import { ErrorMessage } from "../../shared/components/ErrorMessage"
import { MonthCategoryCard } from "./MonthCategoryCard"
// import { HomeSection } from "./HomeSection"
import { Banner } from "../../shared/components/Banner"
import { ProductArrivals } from "./ProductArrival"
import { CategoryOfMonth } from "./CategoryOfMonth"
import { FullContainer } from "../../shared/components/FullContainer"
import { Suspense, lazy } from "react"

const HomeSection = lazy(() => import("./HomeSection"));

export const HomePage = () => {

    const { data: products, isLoading, isError } = useQuery(QUERY_KEYS.PRODUCTS, () => fetchProducts({}));
    const { data: categories } = useQuery(QUERY_KEYS.CATEGORIES, () => fetchCategories());

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <ErrorMessage />
    }

    return (
        <FullContainer>
            <main>
                <section>
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
                <Suspense fallback={<Loading />}>
                    <HomeSection
                        title="Categories of the Month"
                        description="Our top selling categories"
                    >
                        <div>
                            {categories ? (
                                <CategoryOfMonth>
                                    {(categories as any[]).slice(0, 4).map(category => {
                                        return (
                                            <MonthCategoryCard
                                                key={category.id}
                                                data={category}
                                            />
                                        )
                                    })}
                                </CategoryOfMonth>
                            ) : null}
                        </div>
                    </HomeSection>
                </Suspense>
                <Banner className="secondary">
                    <Link to={APP_ROUTES.CATEGORIES}>Explore more categories</Link>
                </Banner>
                <Suspense fallback={<Loading />}>
                    <HomeSection
                        title="Latest Products"
                        description="Our latest products">
                        <div>
                            {products ? (
                                <ProductArrivals>
                                    {(products as Product[]).slice(products.length - 4, products.length).map(product => (
                                        <LatestProductCard
                                            key={product.id}
                                            product={{ ...product, description: product.description.substring(0, 60) + '...' }}
                                        />
                                    ))}
                                </ProductArrivals>
                            ) : null}
                        </div>
                    </HomeSection>
                </Suspense>
                <Banner className="primary">
                    <Link to={APP_ROUTES.PRODUCTS}>View all products</Link>
                </Banner>
            </main>
        </FullContainer>
    )
}