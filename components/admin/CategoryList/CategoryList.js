import { List, Paper } from "@mui/material"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    return (
        <Paper>
            <List>
                {
                    categories.map(category => (
                        <CategoryListItem key={category.id} category={category}/>
                    ))
                }
                <AddCategoryListItem/>
            </List>
        </Paper>
    )
}

export default CategoryList