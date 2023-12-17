import { Category } from "../../../types"

type SelectCategoryProps = {
    categories: Category[];
    selected: string;
    onChange: (value: string) => void
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({ categories, selected, onChange }) => {

    return (
        <select name="categoryId" value={selected} onChange={e => onChange(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}