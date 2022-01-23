import { Avatar, Badge, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { styled } from "@mui/material/styles"
import CloseIcon from '@mui/icons-material/Close';
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import { useToggle } from "../../app/hooks/useToggle";
import { useAddProduct } from "../../app/hooks/useFormik/useAddProduct";

const Input = styled('input')({
    display: 'none'
})

const AddProductDialog = () => {

    const { addProductDialog, closeAddProductDialog } = useToggle()

    const {
        handleSubmit, getFieldProps, handleBlur,
        handleCategoriesChange, handleSubCategoriesChange, handleBrandsChange,
        handlePreviewImageClick, handleUploadChange, handleClearClick,
        values, touched, errors, isSubmitting, preview, categories, brands,
        category, subCategory, subCategories, brand
    } = useAddProduct()

    return (
        <Dialog open={addProductDialog} onClose={closeAddProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Add Product
                </Typography>
                <IconButton onClick={closeAddProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginY: 2}}>
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
                                    border: '1px dashed black',
                                    borderRadius: 1,
                                    padding: 1,
                                    minHeight: 200,
                                    boxSizing: 'content-box'
                                }}
                            >
                                <Grid container spacing={2}>
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
                                                display: values.images?.length >= 5 ? 'none' : 'flex',
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
                        <Grid item lg={12}>
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
                                />
                            }
                            disabled={isSubmitting}
                        >
                            Create
                        </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog