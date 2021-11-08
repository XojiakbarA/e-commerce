import { Typography, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material"

const BrandList = ({brands}) => {
    return(
        <Box sx={{marginTop: 2}}>
            <Typography variant='h6'>
                Brands
            </Typography>
            <FormGroup>
                {
                    brands.map((brand, i) => (
                        <FormControlLabel key={i} control={<Checkbox />} label={brand.title} />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export default BrandList