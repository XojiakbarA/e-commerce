export const productImageURL = 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/products/'
export const shopImageURL = 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/shops/'
export const userImageURL = 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/users/'

export const imageLoader = ({src}) => {
    return 'http://127.0.0.1:8888/e-commerce-api/public/storage/images/' + src
}

export const stringToArray = (str) => {
    return str.split(',').map(item => Number(item))
}

export const appendToFormData = (data) => {
    let formData = new FormData()
    for (let key in data) {
        if (data[key] instanceof Date) {
            formData.append(key, data[key].toISOString())
        } else if (data[key] instanceof FileList) {
            const fileList = data[key]
            for (let file of fileList) {
                formData.append(`${key}[]`, file)
            }
        } else if (data[key] != null) {
            formData.append(key, data[key])
        } else if (data[key] == null) {
            formData.append(key, '')
        }
    }
    return formData
}

export const makeURLArray = (fileList) => {
    const urls = []
    for (let file of fileList) {
        const url = URL.createObjectURL(file)
        urls.push(url)
    }
    return urls
}