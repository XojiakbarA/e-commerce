import { MenuList, MenuItem, Typography, Box } from "@mui/material"
import { useSelector } from "react-redux"

const CategoryList = () => {

    const categories = useSelector(state => state.categories)

    return(
        <Box>
            <Typography variant='h6'>
                Categories
            </Typography>
            <MenuList>
                {
                    categories.map((category, i) => (
                        <MenuItem key={i}>{category.title}</MenuItem>
                    ))
                }
            </MenuList>
        </Box>
    )
}

export default CategoryList