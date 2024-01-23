import React, { useState } from "react";
import { Category, ProductFilters } from "../../../types";
import { PriceRangeInput } from "../PriceRangeInput";
import { SelectCategory } from "../SelectCategory";
import styled from "styled-components";
import { Button } from "../Button";
import { InputText } from "../InputText";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const FormGroup = styled.label`
    display: flex;
    flex-direction: column;
`;

type ProductFilterFormProps = {
    categories: Category[];
    allowedPriceRange: {
        min: number
        max: number
    };
    filters: ProductFilters;
    handleFilterChange: (newFilters: ProductFilters) => void;
    handleClear: () => void;
}

export const ProductFilterForm: React.FC<ProductFilterFormProps> = ({ categories, allowedPriceRange, filters, handleFilterChange, handleClear }) => {

    const [title, setTitle] = useState(filters.title);

    const [category, setCategory] = useState(filters.categoryId);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

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

        handleFilterChange(newFilters);
    }

    return (
        <Form method="get" onSubmit={handleSubmit}>
            <FormGroup>
                Title
                <InputText
                    type="text"
                    name="title"
                    id=""
                    placeholder="Product title"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                Category
                <SelectCategory
                    categories={categories}
                    selected={(category && category.toString()) || ''}
                    onChange={(value: string) => setCategory(parseInt(value))}
                />
            </FormGroup>
            <FormGroup>
                Price
                <PriceRangeInput
                    min={allowedPriceRange.min}
                    max={allowedPriceRange.max}
                    rangeValue={
                        {
                            min: filters.price_min ||
                                allowedPriceRange.min, max: filters.price_max ||
                                    allowedPriceRange.max
                        }
                    }
                />
            </FormGroup>
            <Button type="reset" onClick={handleClear}>Clear filters</Button>
            <Button type="submit">Apply filters</Button>
        </Form>
    )
}