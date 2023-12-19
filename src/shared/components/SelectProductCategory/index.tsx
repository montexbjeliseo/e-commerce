import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants";
import { fetchCategories } from "../../../api";
import { ErrorMessage } from "../ErrorMessage";
import { Category } from "../../../types";

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
        <select name="categoryId" defaultValue={selected}>
            {data && (data as Category[]).map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}