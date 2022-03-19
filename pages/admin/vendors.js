import { Grid } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'
import AdminPageHead from '../../components/common/AdminPageHead'
import DataTable from '../../components/admin/DataTable/DataTable'
import { wrapper } from '../../app/store'
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import { fetchShops } from '../../api/admin'
import { useAdminSearch } from '../../app/hooks/useAdminSearch'
import ShopsTableRow from '../../components/admin/DataTable/DataTableRows/ShopsTableRow'

const headLabels = [
    { label: 'Title', field: 'title' },
    { label: 'Rating', field: 'rating' },
    { label: 'First Name', field: 'first_name' },
    { label: 'Last Name', field: 'last_name' },
    { label: 'Region', field: 'region' },
    { label: 'District', field: 'district' },
    { label: 'Street', field: 'street' },
    { label: 'Home', field: 'home' },
    { label: 'Phone', field: 'phone' }
]

function* labelsGenerator() {
    yield {label: 'By Title', field: 'title'}
    yield {label: 'By First Name', field: 'first_name'}
    yield {label: 'By Last Name', field: 'last_name'}
    yield {label: 'By Region', field: 'region'}
    yield {label: 'By District', field: 'district'}
    yield {label: 'By Street', field: 'street'}
    yield {label: 'By Home', field: 'home'}
    return {label: 'By Phone', field: 'phone'}
}

const colSpan = (field) => {
    return  field === 'title' ||
            field === 'phone'
            ? 2 : 0
}

const Vendors = ( data ) => {

    const shops = data.data
    const meta = data.meta

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Vendors'
                    titleIcon={<StoreIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        shops.map(shop => (
                            <ShopsTableRow key={shop.id} shop={shop}/>
                        ))
                    }
                </DataTable>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

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