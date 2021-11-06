import { Grid } from "@mui/material"
import ProductGallery from "../components/Product/ProductGallery/ProductGallery"
import ProductInfo from '../components/Product/ProductInfo'
import ProductTab from "../components/Product/ProductTab/ProductTab"

const product = {
    id: 1,
    info: {
        title: 'Product 1',
        price: 400,
        brand: 'Nike',
        rating: 4,
        availability: true,
        shop: 'Scarlett Beauty',
    },
    description: 'Supplied by a premier sneaker marketplace dealing with unworn, already sold out, in demand rarities. Each product is rigorously inspected by experienced experts guaranteeing authenticity. The Nike Air Max 270 React “Bauhaus” is the debut colorway of the lifestyle sneaker that combines the 270 Air Max unit with React foam cushioning. Nike Sportswear paired two of the brand’s most popular cushioning platforms for this 2019 release that also features a stylish upper that takes cues from the React Element 87 silhouette. It is constructed in multi-layered no-sew materials with a traditional tongue and speed lacing system. This “Bauhaus” colorway features a multi-color treatment inspired by the Bauhaus art movement that was characterized by designs with simplified geometric shapes and asymmetrical color balance. The Nike Air Max 270 React “Bauhaus” released on July 3, 2019.',
    reviews: [
        {
            id: 1,
            username: 'Jannie Schumm',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.',
            rating: 4,
            date: '9 month ago',
            img: 'images/user/user1.jpg'
        },
        {
            id: 2,
            username: 'Joe Kenan',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.',
            rating: 5,
            date: '11 month ago',
            img: 'images/user/user2.jpg'
        },
        {
            id: 3,
            username: 'Jenifer Tulio',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.',
            rating: 5,
            date: '11 month ago',
            img: 'images/user/user3.jpg'
        }
    ],
    gallery: [
        {id: 1, src: '/images/gallery/product1.jpeg'},
        {id: 2, src: '/images/gallery/product2.png'},
        {id: 3, src: '/images/gallery/product3.png'},
        {id: 4, src: '/images/gallery/product4.png'},
        {id: 5, src: '/images/gallery/product5.png'}
    ]
}

const Product = () => {
    return(
        <>
            <Grid container spacing={2}>
                <Grid item lg={6}>
                    <ProductGallery gallery={product.gallery} />
                </Grid>
                <Grid item lg={6}>
                    <ProductInfo info={product.info} />
                </Grid>
                <Grid item lg={12}>
                    <ProductTab description={product.description} reviews={product.reviews} />
                </Grid>
            </Grid>
        </>
    )
}

export default Product