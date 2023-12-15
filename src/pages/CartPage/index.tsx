import { useNavigate } from "react-router-dom";
import { Accordion } from "../../shared/components/Accordion";
import { CartItemList } from "../../shared/components/CartItemList";
import { OrderSummaryPreview } from "../../shared/components/OrderSummaryPreview";
import "./styles.css";
import { APP_ROUTES } from "../../constants";
import { useCart } from "../../contexts/CartProvider";

export const CartPage = () => {

    const navigate = useNavigate();

    const { items } = useCart();

    const handleClick = () => {
        if (items.length === 0) {
            return;
        }
        navigate(APP_ROUTES.CHECKOUT_ADDRESS)
    }

    return (
        <main className="container pt-3">
            <h1 className="cart-page-title">Your cart</h1>
            <section className="cart-page-container">
                <section>
                    <p className="section-caption">Not ready to checkout? Continue shopping</p>
                    <CartItemList allowRemove={true} />
                    <div className="pt-3 order-information">
                        <h2>Order information</h2>
                        <Accordion
                            title="Return policy">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde dolore, nisi eveniet odit modi distinctio tempore dolorum doloremque dicta veniam?
                            </p>
                        </Accordion>
                        <Accordion
                            title="Shipping Option">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde dolore, nisi eveniet odit modi distinctio tempore dolorum doloremque dicta veniam?
                            </p>
                        </Accordion>
                        <Accordion
                            title="Shipping address">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde dolore, nisi eveniet odit modi distinctio tempore dolorum doloremque dicta veniam?
                            </p>
                        </Accordion>
                    </div>
                </section>
                <aside className="cart-page-aside">
                    <h2>Order summary</h2>
                    <OrderSummaryPreview />
                    <button onClick={handleClick} className="btn btn-primary" disabled={items.length === 0}>Checkout</button>
                </aside>
            </section>

        </main>
    )
}