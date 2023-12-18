import { Product, ProductFilters } from "../../../types"
import "./styles.css";
import { ProductCard } from "../ProductCard";
import { fetchProducts } from "../../../api";
import { QUERY_KEYS } from "../../../constants";
import { useQuery } from "react-query";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { useReducer } from "react";
import { MODIFY_RESOURCE_ACTIONS, modifyResourceReducer } from "../../../reducers/ModifyResourceReducer";
import { Modal } from "../Modal";
import { DeleteProduct } from "../../../pages/Products/DeleteProduct";

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

    const onMutate = () => {
        refetch();
    }

    const handleAskEdit = (product: Product) => {
        dispatch({ type: MODIFY_RESOURCE_ACTIONS.ASK_EDIT, payload: product })
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
            <p>Create new</p>
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
                                onEdit={handleAskEdit}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}