import { Grid } from "@mui/material"
import GroupIcon from '@mui/icons-material/Group'
import { wrapper } from "../../app/store"
import AdminPageHead from "../../components/common/AdminPageHead"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { fetchUsers } from "../../api/admin"
import DataTable from "../../components/admin/DataTable/DataTable"
import UserTableRow from "../../components/admin/DataTable/DataTableRows/UserTableRow"
import { useAdminSearch } from "../../app/hooks/useAdminSearch"

const headLabels = [
    { label: 'User ID', field: 'id' },
    { label: 'First Name', field: 'first_name' },
    { label: 'Last Name', field: 'last_name' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'Birth Date', field: 'birth_date' },
    { label: 'Role', field: 'role' }
]

const colSpan = (field) => {
    return  field === 'id' ||
            field === 'role'
            ? 2 : 0
}

function* labelsGenerator() {
    yield {label: 'By First Name', field: 'first_name'}
    yield {label: 'By Last Name', field: 'last_name'}
    yield {label: 'By Email', field: 'email'}
    yield {label: 'By Phone', field: 'phone'}
    yield {label: 'By Birth Date', field: 'birth_date'}
    return {label: 'By Role', field: 'role'}
}

const Users = ( data ) => {

    const users = data.data
    const meta = data.meta

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Users'
                    titleIcon={<GroupIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        users.map(user => (
                            <UserTableRow key={user.id} user={user}/>
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
        const res = await fetchUsers(query, cookie)
        if (res.status ===  200) {
            return {
                props: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }

})

export default Users

Users.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}