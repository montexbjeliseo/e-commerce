import React from "react";
import { Category, ProductFilters } from "../../../types";
import { PriceRangeInput } from "../PriceRangeInput";
import { SelectCategory } from "../SelectCategory";

type ProductFilterFormProps = {
    categories: Category[];
    allowedPriceRange: {
        min: number
        max: number
    }
    filters: ProductFilters,
    handleFilterChange: (newFilters: ProductFilters) => void
}

export const ProductFilterForm: React.FC<ProductFilterFormProps> = ({ categories, allowedPriceRange, filters, handleFilterChange }) => {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        console.log("ProductFilterForm::handleSubmit::formData", formData);

        const newFilters: ProductFilters = {} as ProductFilters;

        if (formData.title) {
            newFilters.title = formData.title as string;
        }

        if (formData.minprice && formData.maxprice) {
            newFilters.price_min = parseInt(formData.minprice as string);
            newFilters.price_max = parseInt(formData.maxprice as string)
        }

        if (formData.categoryId) {
            newFilters.categoryId = parseInt(formData.categoryId as string);
        }

        console.log("ProductFilterForm::handleSubmit::newFilters", newFilters);

        handleFilterChange(newFilters);
    }

    return (
        <form method="get" onSubmit={handleSubmit}>
            <h3>Title</h3>
            <input className="text-input" type="text" name="title" id="" placeholder="Product title" />
            <h3>Category</h3>
            <SelectCategory categories={categories} />
            <h3>Price</h3>
            <PriceRangeInput min={allowedPriceRange.min} max={allowedPriceRange.max} rangeValue={{ min: filters.price_min, max: filters.price_max}} />
            <button className="btn btn-primary" type="reset">Clear filters</button>
            <button className="btn btn-primary" type="submit">Apply filters</button>
        </form>
    )
}