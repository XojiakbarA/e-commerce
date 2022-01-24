import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../../redux/actions/async/vendor"
import { appendToFormData, makeURLArray } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useAddProduct = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const [preview, setPreview] = useState([])

    const categories = useSelector(state => state.categories)
    const [subCategories, setSubCategories] = useState([])
    const brands = useSelector(state => state.brands)

    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [brand, setBrand] = useState(null)

    const shop_id = router.query.id
    const user_id = useSelector(state => state.user.id)

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
            images: null
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(createProduct(user_id, shop_id, formData, resetForm, formik.setSubmitting))
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

    const handlePreviewImageClick = (i) => {
        const images = { ...formik.values.images }
        delete images[i]
        const dt = new DataTransfer()
        for (let key in images) {
            dt.items.add(images[key])
        }
        images = dt.files
        formik.setFieldValue('images', images)
        setPreview(makeURLArray(images))
    }

    const handleClearClick = () => {
        formik.setFieldValue('images', null)
        setPreview([])
    }

    const handleUploadChange = (e) => {
        const prevImages = formik.values.images
        const newImages = e.target.files

        const dt = new DataTransfer()
        if (prevImages) {
            for (let image of prevImages) {
                dt.items.add(image)
            }
        }
        for (let image of newImages) {
            dt.items.add(image)
        }
        const images = dt.files

        formik.setFieldValue('images', images)
        setPreview(makeURLArray(images))
    }

    return {
        ...formik,
        preview,
        categories,
        subCategories,
        brands,
        category,
        subCategory,
        brand,
        handleCategoriesChange,
        handleSubCategoriesChange,
        handleBrandsChange,
        handleUploadChange,
        handlePreviewImageClick,
        handleClearClick,
    }
}