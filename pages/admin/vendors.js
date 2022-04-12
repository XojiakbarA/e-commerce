import { Avatar, Grid, Rating } from '@mui/material'
import { getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid'
import StoreIcon from '@mui/icons-material/Store'
import PhotoIcon from '@mui/icons-material/Photo'
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import PageTitle from '../../components/common/PageTitle'
import CustomDataGrid from '../../components/admin/DataGrid/DataGrid'
import GridCellExpand from '../../components/admin/DataGrid/GridCellExpand'
import RatingInput from '../../components/admin/DataGrid/RatingInput'
import { wrapper } from '../../app/store'
import { fetchShops } from '../../api/admin'
import { shopImageURL } from '../../utils/utils'

const Vendors = ( data ) => {

    const shops = data.data
    const meta = data.meta

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
            flex: 3,
            minWidth: 150,
            field: 'title',
            headerName: 'Title',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                >
                    <Avatar
                        sx={{ width: 35, height:35, marginRight: 1 }}
                        src={ row.av_image ? shopImageURL + row.av_image.src : undefined }
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
            field: 'first_name',
            headerName: 'First Name',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'last_name',
            headerName: 'Last Name',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'phone',
            headerName: 'Phone',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'region',
            headerName: 'Region',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value.name}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'district',
            headerName: 'District',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value.name}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'street',
            headerName: 'Street',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 1,
            minWidth: 50,
            field: 'home',
            headerName: 'Home',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                />
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    title='Vendors'
                    titleIcon={<StoreIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns={columns}
                    rows={shops}
                    meta={meta}
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

    try {
        const res = await fetchShops(query, cookie)
        if (res.status ===  200) {
            return {
                props: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }

})

export default Vendors

Vendors.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}