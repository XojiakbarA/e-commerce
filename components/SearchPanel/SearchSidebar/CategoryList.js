import { MenuList, MenuItem, Typography, Box } from "@mui/material"

const CategoryList = ({categories}) => {
    return(
        <Box>
            <Typography variant='h6'>
                Categories
            </Typography>
            <MenuList>
                {
                    categories.map((category, i) => (
                        <MenuItem key={i}>{category}</MenuItem>
                    ))
                }
            </MenuList>
        </Box>
    )
}

export default CategoryList