import { MenuList, MenuItem, Typography, Box } from "@mui/material"
import { connect } from "react-redux"

const CategoryList = ({categories}) => {
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

const mapStateToProps = (state) => ({
    categories: state.categories
})

export default connect(mapStateToProps)(CategoryList)