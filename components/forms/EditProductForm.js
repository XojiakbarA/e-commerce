import { Avatar, Badge, Box, Button, CircularProgress, FormHelperText, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from "@mui/material/styles"
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import { productImageURL } from "../../utils/utils"
import { useEditProduct } from "../../app/hooks/useFormik/useEditProduct"
import { useMultiPreview } from "../../app/hooks/usePreview/useMultiPreview"

const Input = styled('input')({
    display: 'none'
})

const EditProductForm = () => {

    const {
        handleSubmit, getFieldProps, handleBlur, setValues,
        handleCategoriesChange, handleSubCategoriesChange, handleBrandsChange,
        handleProductImageClick,
        touched, errors, isSubmitting, product, categories, brands,
        category, subCategory, subCategories, brand, values
    } = useEditProduct()

    const {
        preview,
        handleUploadChange, handlePreviewDeleteClick, handleClearClick
    } = useMultiPreview(values.images, setValues)

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
                                                    onClick={() => handlePreviewDeleteClick(i)}
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
                                        display: values.images_count > 4 ? 'none' : 'flex',
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
                        {errors.images_count}
                    </FormHelperText>
                    <Button
                        variant="outlined"
                        onClick={handleClearClick}
                        disabled={preview.length === 0}
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
                        endIcon={ isSubmitting
                            &&
                            <CircularProgress
                                color='inherit'
                                size={20}
                                sx={{position: 'absolute', top: 8, right: 50}}
                            />
                        }
                        disabled={isSubmitting}
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default EditProductForm