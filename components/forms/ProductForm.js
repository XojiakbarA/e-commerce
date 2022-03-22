import { Avatar, Badge, Box, Button, CircularProgress, FormHelperText, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import MultipleImageUpload from "../common/UploadButton/MultipleImageUpload"
import { productImageURL } from "../../utils/utils"
import { useMultiPreview } from "../../app/hooks/usePreview/useMultiPreview"
import { useFieldProduct } from "../../app/hooks/useFieldProduct"
import { useProduct } from "../../app/hooks/useFormik/useProduct"
import { toggleDeleteProductImageDialog } from "../../app/store/actions/dialogActions"
import { useDispatch } from "react-redux"

const ProductForm = ({ onSubmit, product }) => {

    const dispatch = useDispatch()

    const {
        handleSubmit, getFieldProps, handleBlur, setValues,
        touched, errors, isSubmitting, values
    } = useProduct(product, onSubmit)

    const {
        categories, subCategories, brands, category, subCategory, brand,
        handleCategoriesChange, handleSubCategoriesChange, handleBrandsChange
    } = useFieldProduct(setValues, product)

    const {
        preview,
        handleUploadChange, handlePreviewDeleteClick, handleClearClick
    } = useMultiPreview(values.images, setValues)

    const dialogText = `Do you really want to delete the image?`

    const openDeleteProductImageDialog = (image_id) => {
        dispatch(toggleDeleteProductImageDialog(true, dialogText, image_id))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <TextField
                        label='Title'
                        size='small'
                        fullWidth
                        error={ touched.title && Boolean(errors.title) }
                        helperText={ touched.title && errors.title }
                        { ...getFieldProps('title') }
                    />
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <AutocompleteAsync
                                name='category_id'
                                label='Category'
                                error={touched.category_id && Boolean(errors.category_id)}
                                helperText={touched.category_id && errors.category_id}
                                getOptionLabel={option => option.title}
                                options={categories}
                                option={category}
                                handleChange={handleCategoriesChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <AutocompleteAsync
                                name='sub_category_id'
                                label='Sub Category'
                                error={touched.sub_category_id && Boolean(errors.sub_category_id)}
                                helperText={touched.sub_category_id && errors.sub_category_id}
                                getOptionLabel={option => option.title}
                                options={subCategories}
                                option={subCategory}
                                handleChange={handleSubCategoriesChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <AutocompleteAsync
                                name='brand_id'
                                label='Brand'
                                error={touched.brand_id && Boolean(errors.brand_id)}
                                helperText={touched.brand_id && errors.brand_id}
                                getOptionLabel={option => option.title}
                                options={brands}
                                option={brand}
                                handleChange={handleBrandsChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Box sx={{
                            border: '1px dashed',
                            borderColor: Boolean(errors.images_count) ? 'red' : 'black',
                            borderRadius: 1,
                            padding: 1,
                            minHeight: 200,
                            boxSizing: 'content-box'
                        }}
                    >
                        <Grid container spacing={2}>
                            {
                                product?.images &&
                                product.images.map(image => (
                                    <Grid item key={image.id}>
                                        <Badge
                                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                            badgeContent={
                                                <IconButton
                                                    size="small"
                                                    color='error'
                                                    onClick={() => openDeleteProductImageDialog(image.id)}
                                                >
                                                    <RemoveCircleIcon fontSize='small'/>
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
                            }
                            <MultipleImageUpload
                                preview={preview}
                                size={200}
                                onDeleteClick={handlePreviewDeleteClick}
                                onUploadChange={handleUploadChange}
                                hideUploadButton={values.images_count > 4}
                            />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item lg={12} display='flex' justifyContent='space-between'>
                    <FormHelperText error={true}>
                        {errors.images_count}
                    </FormHelperText>
                    <Button
                        variant="outlined"
                        onClick={handleClearClick}
                        disabled={preview.length === 0}
                        sx={{float: 'right'}}
                        endIcon={<DeleteIcon/>}
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
                        error={ touched.description && Boolean(errors.description) }
                        helperText={ touched.description && errors.description }
                        { ...getFieldProps('description') }
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        type='number'
                        label='Stock'
                        size='small'
                        fullWidth
                        InputProps={{inputProps: {min: 0}}}
                        error={ touched.stock && Boolean(errors.stock) }
                        helperText={ touched.stock && errors.stock }
                        { ...getFieldProps('stock') }
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        label='Price'
                        size='small'
                        fullWidth
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        error={ touched.price && Boolean(errors.price) }
                        helperText={ touched.price && errors.price }
                        { ...getFieldProps('price') }
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        label='Sale Price'
                        size='small'
                        fullWidth
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        error={ touched.sale_price && Boolean(errors.sale_price) }
                        helperText={ touched.sale_price && errors.sale_price }
                        { ...getFieldProps('sale_price') }
                    />
                </Grid>
                <Grid item lg={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{float: 'right'}}
                        endIcon={
                            isSubmitting
                            ?
                            <CircularProgress color='inherit' size={20}/>
                            :
                            product ? <EditIcon/> : <AddIcon/>
                        }
                        disabled={isSubmitting}
                    >
                        { product ? 'Edit' : 'Create' }
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ProductForm