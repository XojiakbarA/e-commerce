export const productImageURL = 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/products/'

export const imageLoader = ({src}) => {
    return 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/' + src
}

export const stringToArray = (str) => {
    return str.split(',').map(item => Number(item))
}