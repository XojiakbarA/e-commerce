import { ListSubheader, List } from '@mui/material'
import CategoryListItem from './CategoryListItem'
import { useSelector } from "react-redux"

const CategoryList = () => {

    const categories = useSelector(state => state.categories)

    return (
    <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        subheader={
            <ListSubheader component="div">
                Categories
            </ListSubheader>
        }
    >
        {
            categories.map(category => (
                <CategoryListItem key={category.id} category={category} />
            ))
        }
    </List>
    );
}

export default CategoryList