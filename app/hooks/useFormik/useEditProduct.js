import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductImage, editProduct, getShopProducts } from "../../../redux/actions"
import { appendToFormData, makeURLArray } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useEditProduct = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [preview, setPreview] = useState([])

    const product = useSelector(state => state.product)

    const categories = useSelector(state => state.categories)
    const [subCategories, setSubCategories] = useState([])
    const brands = useSelector(state => state.brands)

    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [brand, setBrand] = useState(null)

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
            images_count: product.images?.length ?? null,
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(editProduct(product.id, formData, resetForm, setPreview, formik.setSubmitting))
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
        dispatch(deleteProductImage(product.id, image_id))
        dispatch(getShopProducts(router.query.id))
    }

    const handlePreviewImageClick = (i) => {
        const images = { ...formik.values.images }
        delete images[i]

        const dt = new DataTransfer()
        for (let key in images) {
            dt.items.add(images[key])
        }
        images = dt.files

        formik.setValues({
            ...formik.values,
            images_count: formik.values.images_count - 1,
            images: images
        })
        setPreview(makeURLArray(images))
    }

    const handleUploadChange = (e) => {
        const prevImages = formik.values.images
        const newImages = e.target.files

        const countPrevImages = product.images.length
        const countNewImages = newImages.length

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

        formik.setValues({ 
            ...formik.values,
            images_count: countPrevImages + countNewImages,
            images: newImages
        })

        setPreview(makeURLArray(images))
    }

    useEffect(() => {
        if (product?.category) {
            setCategory(product.category)
            const category = categories.find(item => item.id === product.category.id)
            setSubCategories(category.sub_categories)
            setSubCategory(product.sub_category)
            setBrand(product.brand)
        }
    }, [product, categories])

    return {
        ...formik,
        product,
        categories,
        brands,
        preview,
        category,
        subCategory,
        subCategories,
        brand,
        setPreview,
        handleCategoriesChange,
        handleSubCategoriesChange,
        handleBrandsChange,
        handleProductImageClick,
        handlePreviewImageClick,
        handleUploadChange,
    }
}