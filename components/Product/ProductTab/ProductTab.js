import { useState } from 'react'
import {Tabs, Tab, Box} from '@mui/material'
import ProductTabPanel from './ProductTabPanel'
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview/ProductReview';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProductTab = ({description, reviews}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const reviewTitle = `Review (${reviews.length})`

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label={reviewTitle} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <ProductTabPanel value={value} index={0}>
                <ProductDescription description={description} />
            </ProductTabPanel>
            <ProductTabPanel value={value} index={1}>
                <ProductReview reviews={reviews} />
            </ProductTabPanel>
        </Box>
    );
}

export default ProductTab