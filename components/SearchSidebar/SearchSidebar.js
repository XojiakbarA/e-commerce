import { MenuList, MenuItem, Stack, Typography, Box, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import BrandList from "./BrandList"
import CategoryList from "./CategoryList"
import PriceRange from "./PriceRange"
import RatingList from "./RatingList"

const SearchSidebar = ({categories, brands}) => {
    return(
        <Box sx={{width: {xs: 300, sm: 'auto'}}}>
            <Stack padding={2} divider={<Divider orientation='horizontal' />}>
                <CategoryList categories={categories} />
                <PriceRange />
                <BrandList brands={brands} />
                <RatingList />
            </Stack>
        </Box>
    )
}

export default SearchSidebar