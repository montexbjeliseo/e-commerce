import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants";
import { fetchCategories } from "../../../api";
import { ErrorMessage } from "../ErrorMessage";
import { Category } from "../../../types";
import styled from "styled-components";

const StyledSelect = styled.select`
    padding: 12px;
    outline: none;
    border: 2px solid rgb(43, 43, 43);
    border-radius: 7px;
`;

type SelectCategoryProps = {
    selected: string;
}

export const SelectProductCategory: React.FC<SelectCategoryProps> = ({ selected }) => {

    const { data, isLoading, isError } = useQuery([QUERY_KEYS.CATEGORIES], () => fetchCategories())

    if (isLoading) {
        return <div>Loading categories...</div>
    }

    if (isError) {
        return <ErrorMessage />
    }

    return (
        <StyledSelect name="categoryId" defaultValue={selected}>
            {data && (data as Category[]).map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </StyledSelect>
    )
}