import { instance } from "./common"

export const updateProductPublished = (id, data) => {
    return instance.put(`api/admin/products/${id}`, data)
}