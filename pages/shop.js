import { Grid, Pagination } from "@mui/material"
import ShopCard from '../components/shop/ShopCard'

const shops = [
        {
            id: 1,
            title: 'Scarlett Beauty',
            rating: 5,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/shop1-av.jpeg',
            background: 'images/shop/shop1-bg.jpeg'
        },
        {
            id: 2,
            title: 'Scroll Through',
            rating: 5,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/shop2-av.jpeg',
            background: 'images/shop/shop2-bg.jpeg'
        },
        {
            id: 3,
            title: 'Coveted Clicks',
            rating: 3,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/no-av.jpeg',
            background: 'images/shop/no-bg.jpeg'
        },
        {
            id: 4,
            title: 'Constant Shoppers',
            rating: 4,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/shop1-av.jpeg',
            background: 'images/shop/shop1-bg.jpeg'
        },
        {
            id: 5,
            title: 'Keyboard Kiosk',
            rating: 5,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/shop1-av.jpeg',
            background: 'images/shop/shop1-bg.jpeg'
        },
        {
            id: 6,
            title: 'Anytime Buys',
            rating: 4,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/no-av.jpeg',
            background: 'images/shop/no-bg.jpeg'
        },
        {
            id: 7,
            title: 'Word Wide Wishes',
            rating: 4,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/shop2-av.jpeg',
            background: 'images/shop/shop2-bg.jpeg'
        },
        {
            id: 8,
            title: 'Cybershop',
            rating: 5,
            address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
            phone: '(613) 343-9004',
            avatar: 'images/shop/no-av.jpeg',
            background: 'images/shop/no-bg.jpeg'
        }
]

const Shop = () => {
    return(
        <>
            <Grid container spacing={2}>
                {
                    shops.map((shop, i) => (
                        <Grid item xs={12} lg={4} key={i}>
                            <ShopCard shop={shop} />
                        </Grid>
                    ))
                }
            </Grid>
            <Pagination count={5} size='large' color='primary' sx={{my: 2}} />
        </>
    )
}

export default Shop