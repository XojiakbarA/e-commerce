import { useState } from "react"
import { useSelector } from "react-redux"


export const useFieldProduct = (setValues, product) => {

    const categories = useSelector(state => state.categories)
    const brands = useSelector(state => state.brands)

    const initSubCategories = []
    const initCategory = null
    const initSubCategory = null
    const initBrand = null

    if (product.category) {
        initSubCategories = categories.find(item => item.id === product.category.id).sub_categories
        initCategory = product.category
        initSubCategory = product.sub_category
        initBrand = product.brand
    }

    const [subCategories, setSubCategories] = useState(initSubCategories)
    const [category, setCategory] = useState(initCategory)
    const [subCategory, setSubCategory] = useState(initSubCategory)
    const [brand, setBrand] = useState(initBrand)

    const handleCategoriesChange = (e, value) => {
        setSubCategory(null)
        setValues(prevValues => (
            {
                ...prevValues,
                sub_category_id: ''
            }
        ))
        setSubCategories([])

        if (value) {
            setCategory(value)
            setValues(prevValues => (
                {
                    ...prevValues,
                    category_id: value.id
                }
            ))
            setSubCategories(value.sub_categories)
        } else {
            setCategory(null)
            setValues(prevValues => (
                {
                    ...prevValues,
                    category_id: ''
                }
            ))
            setSubCategories([])
        }
    }

    const handleSubCategoriesChange = (e, value) => {
        setSubCategory(value)
        setValues(prevValues => (
            {
                ...prevValues,
                sub_category_id: value?.id
            }
        ))
    }

    const handleBrandsChange = (e, value) => {
        setBrand(value)
        setValues(prevValues => (
            {
                ...prevValues,
                brand_id: value?.id
            }
        ))
    }

    return {
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