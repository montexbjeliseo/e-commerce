import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./shared/components/Layout"
import { HomePage } from "./pages/Home"
import { LoginPage } from "./pages/Auth/Login"
import { RegisterPage } from "./pages/Auth/Register"
import { CategoriesPage } from "./pages/Categories"
import { ProductsPage } from "./pages/Products"
import { ProductDetailPage } from "./pages/Products/ProductDetails"
import { ProductCreatePage } from "./pages/Products/ProductCreate"
import { ProductEditPage } from "./pages/Products/ProductEdit"
import { CartPage } from "./pages/CartPage"
import { NotFoundPage } from "./pages/NotFound"
import { AboutPage } from "./pages/About"
import { QueryClient, QueryClientProvider } from "react-query"
import { APP_ROUTES } from "./constants"


const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={APP_ROUTES.HOME} element={<HomePage />} />
              <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={APP_ROUTES.CATEGORIES} element={<CategoriesPage />} />
              <Route path={APP_ROUTES.PRODUCTS} element={<ProductsPage />} />
              <Route path={APP_ROUTES.PRODUCT_DETAILS} element={<ProductDetailPage />} />
              <Route path={APP_ROUTES.PRODUCT_CREATE} element={<ProductCreatePage />} />
              <Route path={APP_ROUTES.PRODUCT_EDIT} element={<ProductEditPage />} />
              <Route path={APP_ROUTES.CART} element={<CartPage />} />
              <Route path={APP_ROUTES.ABOUT} element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
