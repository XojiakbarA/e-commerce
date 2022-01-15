import { useState } from 'react'
import {Tabs, Tab, Box, Typography, Grid} from '@mui/material'
import ProductTabPanel from './ProductTabPanel'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getReviews } from '../../../redux/actions'
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProductTab = ({description}) => {

    const dispatch = useDispatch()
    const id = useSelector(state => state.product.id)
    const reviews = useSelector(state => state.reviews.data)

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getReviews(id))
    }, [dispatch, id])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label={`Review (${reviews.length})`} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <ProductTabPanel value={value} index={0}>
                <Typography variant='body1'>
                    {description}
                </Typography>
            </ProductTabPanel>
            <ProductTabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item lg={6} height={400} overflow='scroll'>
                        {
                            reviews.length == 0
                            ?
                            <Typography variant='h4'>
                                No reviews yet
                            </Typography>
                            :
                            reviews.map(review => (
                                <ReviewItem key={review.id} review={review} />
                            ))
                        }
                    </Grid>
                    <Grid item lg={6}>
                        <ReviewForm />
                    </Grid>
                </Grid>
            </ProductTabPanel>
        </Box>
    );
}

export default ProductTab