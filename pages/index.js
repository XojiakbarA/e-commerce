import { Container } from "@mui/material"
import Banner from "../components/Banner"
import ProductList from "../components/Product/ProductList"

const products = {
    title: "New Products",
    items: [
        {
            id: 1, title: 'Product 1', price: 60, rating: 2, img: 'images/products/product1.png'
        },
        {
            id: 2, title: 'Product 2', price: 100, rating: 3, img: 'images/products/product2.png'
        },
        {
            id: 3, title: 'Product 3', price: 220, rating: 4, img: 'images/products/product3.png'
        },
        {
            id: 4, title: 'Product 4', price: 40, rating: 4, img: 'images/products/product4.png'
        },
        {
            id: 5, title: 'Product 5', price: 180, rating: 5, img: 'images/products/product5.png'
        },
        {
            id: 6, title: 'Product 6', price: 50, rating: 3, img: 'images/products/product6.png'
        },
        {
            id: 7, title: 'Product 7', price: 70, rating: 4, img: 'images/products/product7.png'
        },
        {
            id: 8, title: 'Product 8', price: 200, rating: 5, img: 'images/products/product8.png'
        }
    ]
}

const Index = () => {
    return(
        <>
        <Banner />
        <Container maxWidth='lg'>
            <ProductList products={products} />

        </Container>
        </>
    )
}

export default Index