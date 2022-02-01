import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../store/actions/async/vendor"
import { appendToFormData } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useAddProduct = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const categories = useSelector(state => state.categories)
    const [subCategories, setSubCategories] = useState([])
    const brands = useSelector(state => state.brands)

    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [brand, setBrand] = useState(null)

    const shop_id = router.query.id

    const formik = useFormik({
        initialValues: {
            title: '',
            category_id: category?.id,
            sub_category_id: subCategory?.id,
            brand_id: brand?.id,
            description: '',
            stock: '',
            price: '',
            sale_price: '',
            images: null,
            images_count: 0,
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(createProduct(shop_id, formData, resetForm, formik.setSubmitting))
        }
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

    return {
        ...formik,
        categories,
        subCategories,
        brands,
        category,
        subCategory,
        brand,
        handleCategoriesChange,
        handleSubCategoriesChange,
        handleBrandsChange
    }
}