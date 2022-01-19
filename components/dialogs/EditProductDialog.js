import { Avatar, Badge, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from "@mui/material/styles"
import { useFormik } from "formik"
import { productValidationSchema } from "../../utils/validate"
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteProductImage, editProduct, getShopProducts } from "../../redux/actions"
import { appendToFormData, productImageURL } from "../../utils/utils"
import { useRouter } from "next/router"
import { makeURLArray } from "../../utils/utils"
import { useToggle } from "../../app/hooks/useToggle"

const Input = styled('input')({
    display: 'none'
})

const EditProductDialog = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const { editProductDialog, closeEditProductDialog } = useToggle()

    const [preview, setPreview] = useState([])

    const product = useSelector(state => state.product)

    const categories = useSelector(state => state.categories)
    const [category, setCategory] = useState(categories[0])

    const [subCategories, setSubCategories] = useState(categories[0].sub_categories)
    const [subCategory, setSubCategory] = useState(subCategories[0])
    const [disabled, setDisabled] = useState(false)

    const brands = useSelector(state => state.brands)
    const [brand, setBrand] = useState(brands[0])

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
            dispatch(editProduct(product.id, formData, resetForm, setPreview))
        },
        enableReinitialize: true
    })

    const handleCategoriesChange = (e, value) => {
        setDisabled(value ? false : true)
        setCategory(value)
            setSubCategory(value?.sub_categories[0] ?? null)
            setSubCategories(value?.sub_categories ?? [])
            formik.setValues({
                ...formik.values,
                category_id: value?.id,
                sub_category_id: value?.sub_categories[0]?.id
            })
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

    return (
        <Dialog open={editProductDialog} onClose={e => closeEditProductDialog(setPreview)} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Edit Product
                </Typography>
                <IconButton onClick={e => closeEditProductDialog(setPreview)}>
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
                                        name='category_id'
                                        label='Category'
                                        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                                        helperText={formik.touched.category_id && formik.errors.category_id}
                                        getOptionLabel={option => option.title}
                                        options={categories}
                                        option={category}
                                        handleChange={handleCategoriesChange}
                                        handleBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <AutocompleteAsync
                                        name='sub_category_id'
                                        label='Sub Category'
                                        error={formik.touched.sub_category_id && Boolean(formik.errors.sub_category_id)}
                                        helperText={formik.touched.sub_category_id && formik.errors.sub_category_id}
                                        getOptionLabel={option => option.title}
                                        options={subCategories}
                                        option={subCategory}
                                        handleChange={handleSubCategoriesChange}
                                        handleBlur={formik.handleBlur}
                                        disabled={disabled}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <AutocompleteAsync
                                        name='brand_id'
                                        label='Brand'
                                        error={formik.touched.brand_id && Boolean(formik.errors.brand_id)}
                                        helperText={formik.touched.brand_id && formik.errors.brand_id}
                                        getOptionLabel={option => option.title}
                                        options={brands}
                                        option={brand}
                                        handleChange={handleBrandsChange}
                                        handleBlur={formik.handleBlur}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Box sx={{
                                    border: '1px dashed',
                                    borderColor: Boolean(formik.errors.images_count) ? 'red' : 'black',
                                    borderRadius: 1,
                                    padding: 1,
                                    minHeight: 200,
                                    boxSizing: 'content-box'
                                }}
                            >
                                <Grid container spacing={2}>
                                    {
                                        product?.images
                                        ?
                                        product.images.map(image => (
                                            <Grid item key={image.id}>
                                                <Badge
                                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                                    badgeContent={
                                                        <IconButton
                                                            size="small"
                                                            color='primary'
                                                            onClick={() => handleProductImageClick(image.id)}
                                                        >
                                                            <CloseIcon fontSize='small'/>
                                                        </IconButton>
                                                    }
                                                >
                                                    <Avatar
                                                        src={productImageURL + image.src}
                                                        alt={image.src}
                                                        variant="rounded"
                                                        sx={{width: 200, height: 200}}
                                                    />
                                                </Badge>
                                            </Grid>
                                        ))
                                        :
                                        <CircularProgress/>
                                    }
                                    {
                                        preview.map((url, i) => (
                                            <Grid item key={url}>
                                                <Badge
                                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                                    badgeContent={
                                                        <IconButton
                                                            size="small"
                                                            color='primary'
                                                            onClick={() => handlePreviewImageClick(i)}
                                                        >
                                                            <CloseIcon fontSize='small'/>
                                                        </IconButton>
                                                    }
                                                >
                                                    <Avatar
                                                        src={url}
                                                        alt={url}
                                                        variant="rounded"
                                                        sx={{width: 200, height: 200}}
                                                    />
                                                </Badge>
                                            </Grid>
                                        ))
                                    }
                                    <Grid item>
                                        <Box sx={{
                                                width: 200,
                                                height: 200,
                                                display: product.images?.length + preview.length >= 5 ? 'none' : 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <label htmlFor="images">
                                                <Input
                                                    accept="image/*"
                                                    id="images"
                                                    multiple
                                                    type="file"
                                                    onChange={handleUploadChange}
                                                />
                                                <IconButton component='span'>
                                                    <AddPhotoAlternateIcon fontSize="large"/>
                                                </IconButton>
                                            </label>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item lg={12} display='flex' justifyContent='space-between'>
                            <FormHelperText error={true}>
                                {formik.errors.images_count}
                            </FormHelperText>
                            <Button
                                variant="outlined"
                                
                                
                                sx={{float: 'right'}}
                            >
                                Clear
                            </Button>
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
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{float: 'right'}}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductDialog