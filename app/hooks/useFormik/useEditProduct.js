import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductImage, editProduct } from "../../store/actions/async/vendor"
import { appendToFormData } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useEditProduct = () => {

    const dispatch = useDispatch()

    const product = useSelector(state => state.product)

    const categories = useSelector(state => state.categories)

    const initSubCategories = categories.find(item => item.id === product.category?.id)?.sub_categories

    const [subCategories, setSubCategories] = useState(initSubCategories)
    const brands = useSelector(state => state.brands)

    const [category, setCategory] = useState(product.category)
    const [subCategory, setSubCategory] = useState(product.sub_category)
    const [brand, setBrand] = useState(product.brand)

    const shop_id = product.shop?.id
    const product_id = product.id

    const formik = useFormik({
        initialValues: {
            title: product.title ?? '',
            category_id: product.category?.id ?? '',
            sub_category_id: product.sub_category?.id ?? '',
            brand_id: product.brand?.id ?? '',
            shop_id: product.shop?.id ?? '',
            description: product.description ?? '',
            stock: product.stock ?? '',
            price: product.price ?? '',
            sale_price: product.sale_price ?? '',
            images: null,
            images_count: 0,
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(editProduct(shop_id, product_id, formData, resetForm, formik.setSubmitting))
        },
        enableReinitialize: true
    })

    const handleCategoriesChange = (e, value) => {
        setSubCategory(null)
        formik.setFieldValue('sub_category_id', '')
        setSubCategories([])
        if (value) {
            setCategory(value)
            formik.setFieldValue('category_id', value.id)
            setSubCategories(value.sub_categories)
        } else {
            setCategory(null)
            formik.setFieldValue('category_id', '')
            setSubCategories([])
        }
    }

    const handleSubCategoriesChange = (e, value) => {
        setSubCategory(value)
        formik.setValues({...formik.values, sub_category_id: value?.id})
    }

    const handleBrandsChange = (e, value) => {
        setBrand(value)
        formik.setValues({...formik.values, brand_id: value?.id})
    }

    const handleProductImageClick = (image_id) => {
        dispatch(deleteProductImage(shop_id, product.id, image_id))
    }

    return {
        ...formik,
        product,
        categories,
        brands,
        category,
        subCategory,
        subCategories,
        brand,
        handleCategoriesChange,
        handleSubCategoriesChange,
        handleBrandsChange,
        handleProductImageClick
    }
}