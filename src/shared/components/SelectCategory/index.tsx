import { Category } from "../../../types"

type SelectCategoryProps = {
    categories: Category[]
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({categories}) => {

    return (
        <select name="categoryId">
            <option value="">All</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}