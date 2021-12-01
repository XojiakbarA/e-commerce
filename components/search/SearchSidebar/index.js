import { Stack, Box, Divider } from "@mui/material"
import BrandList from "./BrandList"
import CategoryList from "./CategoryList/CategoryList"
import PriceRange from "./PriceRange"
import RatingList from "./RatingList"

const SearchSidebar = () => {
    return(
        <Box sx={{width: {xs: 300, sm: 'auto'}}}>
            <Stack padding={2} spacing={2} divider={<Divider orientation='horizontal' />}>
                <CategoryList />
                <PriceRange />
                <BrandList />
                <RatingList />
            </Stack>
        </Box>
    )
}

export default SearchSidebar