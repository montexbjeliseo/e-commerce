import { useNavigate } from "react-router-dom";
import { Accordion } from "../../shared/components/Accordion";
import { CartItemList } from "../../shared/components/CartItemList";
import { OrderSummaryPreview } from "../../shared/components/OrderSummaryPreview";
import { APP_ROUTES } from "../../constants";
import { useCart } from "../../contexts/CartProvider";
import { FullContainer } from "../../shared/components/FullContainer";
import { MutedText } from "../Products/ProductLayout";
import { CartPageLayout } from "./CartPageLayout";
import { Button } from "../../shared/components/Button";

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
        <FullContainer>
            <main className="container pt-3">
                <h2>Your cart</h2>
                <CartPageLayout>
                    <section>
                        <MutedText>Not ready to checkout? Continue shopping</MutedText>
                        <CartItemList allowRemove={true} />
                    </section>
                    <section>
                        <h3>Order summary</h3>
                        <OrderSummaryPreview />
                        <Button onClick={handleClick} disabled={items.length === 0}>Checkout</Button>
                    </section>
                </CartPageLayout>

            </main>
            <aside>
                <h3>Order information</h3>
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
            </aside>
        </FullContainer>
    )
}