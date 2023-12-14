import { useCart } from "../../contexts/CartProvider";
import { Accordion } from "../../shared/components/Accordion";
import { CartItemCard } from "./CartItemCard";
import "./styles.css";

export const CartPage = () => {

    const { items } = useCart();

    return (
        <main className="container pt-3">
            <h1 className="cart-page-title">Your cart</h1>
            <section className="cart-page-container">
                <section>
                    <p className="section-caption">Not ready to checkout? Continue shopping</p>
                    <ul>
                        {items.map((item) => (
                            <li key={item.product.id}>
                                <CartItemCard item={item} />
                            </li>
                        ))}
                    </ul>
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
                    <label>Cupon code: <br />
                        <input className="text-input" type="text" placeholder="Enter cupon code here..." />
                    </label>
                    <p>Subtotal: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
                    <p>Shipping: <span>Calculated at checkout</span></p>
                    <hr />
                    <p>Total: ${items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}</p>
                    <button className="btn btn-primary">Checkout</button>
                </aside>
            </section>

        </main>
    )
}