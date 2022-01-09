import { Avatar, Badge, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useDispatch, useSelector } from "react-redux"
import { createProduct, toggleAddProductDialog } from "../../../redux/actions"
import { useFormik } from "formik"
import { createProductValidationSchema } from "../../../utils/validate"
import AutocompleteAsync from "../../common/AutocompleteAsync/AutocompleteAsync"
import { useEffect, useState } from "react"
import { appendToFormData } from "../../../utils/utils";

const Input = styled('input')({
    display: 'none'
})

const AddProductDialog = () => {

    const dispatch = useDispatch()
    const addProductDialog = useSelector(state => state.toggle.addProductDialog)

    const [preview, setPreview] = useState([])

    const categories = useSelector(state => state.categories)
    const [category, setCategory] = useState(categories[0])
    const categoriesLoading = categories.length === 0

    const [subCategories, setSubCategories] = useState(categories[0].sub_categories)
    const [subCategory, setSubCategory] = useState(subCategories[0])
    const [disabled, setDisabled] = useState(false)
    const subCategoriesLoading = subCategories.length === 0

    const brands = useSelector(state => state.brands)
    const [brand, setBrand] = useState(brands[0])
    const brandsLoading = brands.length === 0

    const formik = useFormik({
        initialValues: {
            title: '',
            category_id: category.id,
            sub_category_id: subCategory.id,
            brand_id: brand.id,
            description: '',
            stock: '',
            price: '',
            sale_price: '',
            images: null
        },
        validationSchema: createProductValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(createProduct(formData))
        }
    })

    const closeAddProductDialog = () => {
        dispatch(toggleAddProductDialog(false))
        setPreview([])
        formik.setFieldValue('images', null)
    }

    const handleCategoriesChange = (e, value) => {
        if (value === null) {
            setDisabled(true)
            setCategory({id: 1, title: ''})
            formik.setFieldValue('category_id', 1)
            setSubCategory({id: 1, title: ''})
            setSubCategories([{id: 1, title: ''}])
        } else {
            setDisabled(false)
            setCategory(value)
            formik.setFieldValue('category_id', value?.id)
            setSubCategories([])
            setSubCategory(value.sub_categories[0])
            setSubCategories(value.sub_categories)
        }
    }

    const handleSubCategoriesChange = (e, value) => {
        setSubCategory(value)
        formik.setFieldValue('sub_category_id', value?.id)
    }

    const handleBrandsChange = (e, value) => {
        setBrand(value)
        formik.setFieldValue('brand_id', value?.id)
    }

    const handleUploadChange = (e) => {
        const images = e.target.files
        formik.setFieldValue('images', images)
        if (images) {
            const urls = []
            for (let image of images) {
                const url = URL.createObjectURL(image)
                urls.push(url)
            }
            setPreview(urls)
        }
    }

    const handleImageClick = (i) => {
        const images = { ...formik.values.images }
        delete images[i]
        const dt = new DataTransfer()
        for (let key in images) {
            dt.items.add(images[key])
        }
        images = dt.files
        formik.setFieldValue('images', images)
        const urls = []
            for (let image of images) {
                const url = URL.createObjectURL(image)
                urls.push(url)
            }
            setPreview(urls)
    }

    const handleClearClick = () => {
        formik.setFieldValue('images', null)
        setPreview([])
    }

    return (
        <Dialog open={addProductDialog} onClose={closeAddProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography>
                    Add Product
                </Typography>
                <IconButton onClick={closeAddProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginY: 2}}>
                    <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <TextField
                                label='Title'
                                size='small'
                                fullWidth
                                error={ formik.touched.title && Boolean(formik.errors.title) }
                                helperText={ formik.touched.title && formik.errors.title }
                                { ...formik.getFieldProps('title') }
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Grid container spacing={2}>
                                <Grid item lg={4}>
                                    <AutocompleteAsync
                                        formikKey='category_id'
                                        fieldLabel='Category'
                                        fieldError={formik.touched.category_id && Boolean(formik.errors.category_id)}
                                        fieldHelperText={formik.touched.category_id && formik.errors.category_id}
                                        getOptionLabel={option => option.title}
                                        options={categories}
                                        option={category}
                                        loading={categoriesLoading}
                                        handleChange={handleCategoriesChange}
                                        handleBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <AutocompleteAsync
                                        formikKey='sub_category_id'
                                        fieldLabel='Sub Category'
                                        fieldError={formik.touched.sub_category_id && Boolean(formik.errors.sub_category_id)}
                                        fieldHelperText={formik.touched.sub_category_id && formik.errors.sub_category_id}
                                        getOptionLabel={option => option.title}
                                        options={subCategories}
                                        option={subCategory}
                                        loading={subCategoriesLoading}
                                        handleChange={handleSubCategoriesChange}
                                        handleBlur={formik.handleBlur}
                                        disabled={disabled}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <AutocompleteAsync
                                        formikKey='brand_id'
                                        fieldLabel='Brand'
                                        fieldError={formik.touched.brand_id && Boolean(formik.errors.brand_id)}
                                        fieldHelperText={formik.touched.brand_id && formik.errors.brand_id}
                                        getOptionLabel={option => option.title}
                                        options={brands}
                                        option={brand}
                                        loading={brandsLoading}
                                        handleChange={handleBrandsChange}
                                        handleBlur={formik.handleBlur}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <label htmlFor="images">
                                <Input
                                    accept="image/*"
                                    id="images"
                                    multiple
                                    type="file"
                                    onChange={handleUploadChange}
                                />
                                <Button variant="contained" component="span">
                                    Upload Images
                                </Button>
                            </label>
                            <Button
                                variant="outlined"
                                onClick={handleClearClick}
                                sx={{marginLeft: 2, display: preview.length > 0 ? 'flex-block' : 'none'}}
                            >Clear</Button>
                        </Grid>
                        <Grid item lg={12}>
                            <Grid container spacing={2}>
                                {
                                    preview.map((url, i) => (
                                        <Grid item key={url}>
                                            <Badge
                                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                                badgeContent={
                                                    <IconButton size="small" color='primary' onClick={() => handleImageClick(i)}>
                                                        <CloseIcon fontSize='small'/>
                                                    </IconButton>
                                                }
                                            >
                                                <Avatar
                                                    src={url ?? 'images/products/product1.png'}
                                                    alt=""
                                                    variant="rounded"
                                                    sx={{width: 200, height: 200}}
                                                />
                                            </Badge>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                label='Description'
                                size='small'
                                multiline
                                rows={5}
                                fullWidth
                                error={ formik.touched.description && Boolean(formik.errors.description) }
                                helperText={ formik.touched.description && formik.errors.description }
                                { ...formik.getFieldProps('description') }
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <TextField
                                type='number'
                                label='Stock'
                                size='small'
                                fullWidth
                                InputProps={{inputProps: {min: 0}}}
                                error={ formik.touched.stock && Boolean(formik.errors.stock) }
                                helperText={ formik.touched.stock && formik.errors.stock }
                                { ...formik.getFieldProps('stock') }
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <TextField
                                label='Price'
                                size='small'
                                fullWidth
                                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                error={ formik.touched.price && Boolean(formik.errors.price) }
                                helperText={ formik.touched.price && formik.errors.price }
                                { ...formik.getFieldProps('price') }
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <TextField
                                label='Sale Price'
                                size='small'
                                fullWidth
                                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                error={ formik.touched.sale_price && Boolean(formik.errors.sale_price) }
                                helperText={ formik.touched.sale_price && formik.errors.sale_price }
                                { ...formik.getFieldProps('sale_price') }
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Button type='submit' variant='contained' sx={{float: 'right'}}>Create</Button>
                        </Grid>
                    </Grid>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog