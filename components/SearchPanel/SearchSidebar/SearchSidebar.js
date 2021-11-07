import { MenuList, MenuItem, Stack, Typography, Box, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import BrandList from "./BrandList"
import CategoryList from "./CategoryList"
import PriceRange from "./PriceRange"
import RatingList from "./RatingList"

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6']
const brands = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4']

const SearchSidebar = () => {
    return(
        <Stack padding={2} divider={<Divider orientation='horizontal' />}>
            <CategoryList categories={categories} />
            <PriceRange />
            <BrandList brands={brands} />
            <RatingList />
        </Stack>
    )
}

export default SearchSidebar