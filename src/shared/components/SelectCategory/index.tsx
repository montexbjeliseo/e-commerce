import styled from "styled-components"
import { Category } from "../../../types"

const SelectStyled = styled.select`
    padding: 12px;
    outline: none;
    border: 2px solid rgb(43, 43, 43);
    border-radius: 7px;
`;

type SelectCategoryProps = {
    categories: Category[];
    selected: string;
    onChange: (value: string) => void
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({ categories, selected, onChange }) => {

    return (
        <SelectStyled name="categoryId" value={selected} onChange={e => onChange(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </SelectStyled>
    )
}