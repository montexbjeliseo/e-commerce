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


const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/products/create" element={<ProductCreatePage />} />
              <Route path="/products/edit/:id" element={<ProductEditPage />} />
              <Route path="/cart-detail" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
