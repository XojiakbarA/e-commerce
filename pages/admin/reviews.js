import { Grid, Avatar, Rating, Switch } from "@mui/material"
import { getGridBooleanOperators, getGridDateOperators, getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid"
import CommentIcon from '@mui/icons-material/Comment'
import PhotoIcon from '@mui/icons-material/Photo'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import AdminPageHead from "../../components/common/AdminPageHead"
import CustomDataGrid from "../../components/admin/DataGrid/DataGrid"
import GridCellExpand from "../../components/admin/DataGrid/GridCellExpand"
import RatingInput from "../../components/admin/DataGrid/RatingInput"
import DateInput from "../../components/admin/DataGrid/DateInput"
import SwitchInput from "../../components/admin/DataGrid/SwitchInput"
import { wrapper } from "../../app/store"
import { editReviewPublished, getReviews } from "../../app/store/actions/async/admin"
import { useDispatch, useSelector } from "react-redux"
import { productImageURL, userImageURL } from "../../utils/utils"

const Reviews = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.toggle.isLoading)
    const reviews = useSelector(state => state.reviews.data)
    const meta = useSelector(state => state.reviews.meta)

    const handleSwitchChange = (e, id) => {
        dispatch(editReviewPublished(id, {published: e.target.checked}))
    }

    const columns = [
        {
            type: 'string',
            flex: 1,
            minWidth: 50,
            field: 'id',
            headerName: 'ID',
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 4,
            minWidth: 150,
            field: 'user_name',
            headerName: 'User',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                >
                    <Avatar
                        sx={{ width: 35, height:35, marginRight: 1 }}
                        src={ row.user_image ? userImageURL + row.user_image?.src : undefined }
                    />
                </GridCellExpand>
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 150,
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
            flex: 4,
            minWidth: 150,
            field: 'text',
            headerName: 'Review',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            )
        },
        {
            type: 'string',
            flex: 4,
            minWidth: 200,
            field: 'product_title',
            headerName: 'Product',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                >
                    <Avatar
                        variant='rounded'
                        sx={{ width: 35, height:35, marginRight: 1 }}
                        src={ row.product_image ? productImageURL + row.product_image?.src : undefined }
                    >
                        <PhotoIcon/>
                    </Avatar>
                </GridCellExpand>
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'date',
            flex: 2,
            minWidth: 150,
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
                    title='Reviews'
                    titleIcon={<CommentIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns ={columns}
                    rows={reviews}
                    meta={meta}
                    loading={isLoading}
                />
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const cookie = req?.headers.cookie
    const isAdmin = getState()?.user?.role == 'admin'

    if (!isAdmin) {
        return {
            notFound: true
        }
    }

    query.count = query.count ?? 5
    query.page = query.page ?? 1

    await dispatch(getReviews(query, cookie))

})

export default Reviews

Reviews.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}