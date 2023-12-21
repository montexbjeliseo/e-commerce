import { Product, ProductFilters } from "../../../types"
import "./styles.css";
import { ProductCard } from "../ProductCard";
import { fetchProducts } from "../../../api";
import { APP_ROUTES, QUERY_KEYS } from "../../../constants";
import { useQuery } from "react-query";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { useReducer } from "react";
import { MODIFY_RESOURCE_ACTIONS, modifyResourceReducer } from "../../../reducers/ModifyResourceReducer";
import { Modal } from "../Modal";
import { DeleteProduct } from "../../../pages/Products/DeleteProduct";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateNewText = styled.p`
    a {
        opacity: 0.5;
        font-weight: bold;
        padding: 5px;
        user-select: none;
        color: #0D0D0D;
        text-decoration: none;
        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }
`;

type ProductListProps = {
    filters: ProductFilters;
}

export const ProductList: React.FC<ProductListProps> = ({ filters }) => {

    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
        refetch: refetch
    } = useQuery([QUERY_KEYS.PRODUCTS, filters], () => fetchProducts(filters));

    const [askedFor, dispatch] = useReducer(modifyResourceReducer, {
        resource: null,
        askedToDelete: false,
        askedToEdit: false
    })

    const navigate = useNavigate();

    const onMutate = () => {
        refetch();
    }

    const handleAskEdit = (product: Product) => {
        navigate(APP_ROUTES.PRODUCT_EDIT.replace(":id", product.id.toString()));
    }

    const handleAskDelete = (product: Product) => {
        dispatch({ type: MODIFY_RESOURCE_ACTIONS.ASK_DELETE, payload: product })
    }

    if (isLoadingProducts) {
        return (
            <Loading />
        )
    }

    if (isErrorProducts) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <div>
            <div>
                {askedFor.resource ? (
                    <Modal isOpen={askedFor.askedToDelete} onClose={() => dispatch({ type: MODIFY_RESOURCE_ACTIONS.CANCEL, payload: null })}>
                        <DeleteProduct
                            data={askedFor.resource as Product}
                            onDeleted={onMutate}
                        />
                    </Modal>
                ) : null}
            </div>
            <CreateNewText>
                <Link to={APP_ROUTES.PRODUCT_CREATE}>
                    Create new
                </Link>
            </CreateNewText>

            <div className="product-list">

                {!products || products.length === 0 ? (
                    <h2>There are no products : (</h2>
                ) : (
                    <>
                        {(products as Product[]).map((product) => (
                            <ProductCard
                                key={product.id}
                                data={product}
                                onDelete={handleAskDelete}
                                onEdit={(handleAskEdit)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}