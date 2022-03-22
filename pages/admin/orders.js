import { Grid } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AdminPageHead from '../../components/common/AdminPageHead'
import DataTable from '../../components/admin/DataTable/DataTable'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { useAdminSearch } from "../../app/hooks/useAdminSearch"
import { fetchOrders } from "../../api/admin"
import OrdersTableRow from "../../components/admin/DataTable/DataTableRows/OrdersTableRow"

const headLabels = [
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'Region', field: 'region' },
    { label: 'District', field: 'district' },
    { label: 'Street', field: 'street' },
    { label: 'Home', field: 'home' },
    { label: 'Products', field: 'order_products' },
    { label: 'Total', field: 'total' },
]

const colSpan = (field) => {
    return  field == 'total'
            ? 2 : 0
}

function* labelsGenerator() {
    yield {label: 'By Name', field: 'name'}
    yield {label: 'By Email', field: 'email'}
    yield {label: 'By Phone', field: 'phone'}
    yield {label: 'By Region', field: 'region'}
    yield {label: 'By District', field: 'district'}
    yield {label: 'By Street', field: 'street'}
    yield {label: 'By Home', field: 'home'}
}

const Orders = (data) => {

    const orders = data.data
    const meta = data.meta

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Orders'
                    titleIcon={<ShoppingBagIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        orders.map(order => (
                            <OrdersTableRow order={order} key={order.id}/>
                        ))
                    }
                </DataTable>
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