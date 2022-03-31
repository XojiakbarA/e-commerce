import { Avatar, AvatarGroup, Grid } from "@mui/material"
import { getGridStringOperators } from "@mui/x-data-grid"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PhotoIcon from '@mui/icons-material/Photo'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import AdminPageHead from '../../components/common/AdminPageHead'
import CustomDataGrid from "../../components/admin/DataGrid/DataGrid"
import GridCellExpand from "../../components/admin/DataGrid/GridCellExpand"
import GridCellExpandList from "../../components/admin/DataGrid/GridCellExpandList"
import { wrapper } from "../../app/store"
import { fetchOrders } from "../../api/admin"
import { productImageURL } from "../../utils/utils"

const Orders = (data) => {

    const orders = data.data
    const meta = data.meta

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

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
            flex: 2,
            minWidth: 100,
            field: 'name',
            headerName: 'Name',
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
            field: 'email',
            headerName: 'Email',
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
            field: 'district',
            headerName: 'District',
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
        {
            type: 'string',
            flex: 2,
            minWidth: 100,
            field: 'order_products',
            headerName: 'Products',
            valueGetter: ({ row }) => row,
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpandList
                    value={value.order_products}
                    width={colDef.computedWidth}
                >
                    <AvatarGroup max={3} spacing='small'>
                        {
                            row.order_products.map(product => (
                                <Avatar
                                    sx={{ width: 35, height:35 }}
                                    key={product.id}
                                    src={product.image ? productImageURL + product.image : undefined}
                                >
                                    <PhotoIcon/>
                                </Avatar>
                            ))
                        }
                    </AvatarGroup>
                </GridCellExpandList>
            ),
            filterable: false,
            sortable: false
        },
        {
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'total',
            headerName: 'Total',
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
        },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Orders'
                    titleIcon={<ShoppingBagIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns={columns}
                    rows={orders}
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
        const res = await fetchOrders(query, cookie)
        if (res.status ===  200) {
            return {
                props: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }

})

export default Orders

Orders.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}