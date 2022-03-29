import { Avatar, Chip, Grid, Rating, Switch } from "@mui/material"
import { getGridBooleanOperators, getGridDateOperators, getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid"
import ListAltIcon from '@mui/icons-material/ListAlt'
import PhotoIcon from '@mui/icons-material/Photo'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import AdminPageHead from '../../components/common/AdminPageHead'
import CustomDataGrid from "../../components/admin/DataGrid/DataGrid"
import GridCellExpand from "../../components/admin/DataGrid/GridCellExpand"
import RatingInput from "../../components/admin/DataGrid/RatingInput"
import SwitchInput from "../../components/admin/DataGrid/SwitchInput"
import DateInput from "../../components/admin/DataGrid/DateInput"
import { productImageURL } from "../../utils/utils"
import { wrapper } from '../../app/store'
import { editProductPublished, getProducts } from '../../app/store/actions/async/admin'
import { useDispatch, useSelector } from "react-redux"

const Products = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.toggle.isLoading)
    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const handleSwitchChange = (e, id) => {
        dispatch(editProductPublished(id, {published: e.target.checked}))
    }

    const columns = [
        {
            type: 'string',
            flex: 1,
            minWidth: 50,
            field: 'id',
            headerName: 'ID',
            sortable: false,
            filterable: false
        },
        {
            type: 'string',
            flex: 4,
            minWidth: 200,
            field: 'title',
            headerName: 'Title',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                >
                    <Avatar
                        variant='rounded'
                        sx={{ width: 35, height:35, marginRight: 1 }}
                        src={ row.image ? productImageURL + row.image.src : undefined }
                    >
                        <PhotoIcon/>
                    </Avatar>
                </GridCellExpand>
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'stock',
            headerName: 'Stock',
            renderCell: ({ row }) => (
                <Chip
                    label={row.stock}
                    size='small'
                    variant='outlined'
                    color={row.stock < 6 ? 'warning' : 'info'}
                />
            )
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'price',
            headerName: 'Price',
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'sale_price',
            headerName: 'Sale Price',
            valueFormatter: ({ value }) => {
                if (value) {
                    return currencyFormatter.format(Number(value))
                }
                return '-'
            }
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'rating',
            headerName: 'Rating',
            renderCell: ({ row }) => (
                <Rating value={row.rating} size='small' readOnly/>
            ),
            filterOperators: getGridNumericOperators()
                .filter(operator => operator.value === '=')
                .map(operator => ({
                    ...operator,
                    InputComponent: RatingInput
                }))
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'brand_title',
            headerName: 'Brand Title',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            )
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'category_title',
            headerName: 'Category Title',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            )
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'shop_title',
            headerName: 'Shop Title',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            )
        },
        {
            type: 'date',
            flex: 2,
            minWidth: 100,
            field: 'created_at',
            headerName: 'Created At',
            filterOperators: getGridDateOperators()
                .filter(operator => operator.value === 'is')
                .map(operator => ({
                    ...operator,
                    InputComponent: DateInput
                }))
        },
        {
            type: 'boolean',
            flex: 2,
            field: 'published',
            headerName: 'Published',
            renderCell: ({ row }) => (
                <Switch
                    inputProps={{ 'aria-label': 'published' }}
                    checked={Boolean(row.published)}
                    onChange={e => handleSwitchChange(e, row.id)}
                    disabled={isLoading}
                />
            ),
            filterOperators: getGridBooleanOperators()
                .map(operator => ({
                    ...operator,
                    InputComponent: SwitchInput
                }))
        },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Products'
                    titleIcon={<ListAltIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns={columns}
                    rows={products}
                    meta={meta}
                    loading={isLoading}
                />
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const cookie = req.headers.cookie
    const isAdmin = getState()?.user?.role == 'admin'

    if (!isAdmin) {
        return {
            notFound: true
        }
    }

    query.count = query.count ?? 5
    query.page = query.page ?? 1

    await dispatch(getProducts(query, cookie))

})

export default Products

Products.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}