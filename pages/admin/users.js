import { Avatar, Chip, Grid } from "@mui/material"
import { getGridDateOperators, getGridSingleSelectOperators, getGridStringOperators } from "@mui/x-data-grid"
import GroupIcon from '@mui/icons-material/Group'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import AdminPageHead from "../../components/common/AdminPageHead"
import CustomDataGrid from "../../components/admin/DataGrid/DataGrid"
import GridCellExpand from "../../components/admin/DataGrid/GridCellExpand"
import DateInput from "../../components/admin/DataGrid/DateInput"
import { wrapper } from "../../app/store"
import { fetchUsers } from "../../api/admin"
import { userImageURL } from "../../utils/utils"

const Users = ( data ) => {

    const users = data.data
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
            flex: 4,
            minWidth: 100,
            field: 'first_name',
            headerName: 'First Name',
            renderCell: ({ value, colDef, row }) => (
                <GridCellExpand
                    value={value}
                    width={colDef.computedWidth}
                >
                    <Avatar
                        sx={{ width: 35, height:35, marginRight: 1 }}
                        src={ row.image ? userImageURL + row.image.src : undefined }
                    />
                </GridCellExpand>
            ),
            filterOperators: getGridStringOperators()
                .filter(operator => operator.value === 'contains')
        },
        {
            type: 'string',
            flex: 4,
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
            flex: 3,
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
            flex: 3,
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
            flex: 3,
            minWidth: 100,
            field: 'birth_date',
            headerName: 'Birth Date',
            filterOperators: getGridDateOperators()
                .filter(operator => operator.value === 'is')
                .map(operator => ({
                    ...operator,
                    InputComponent: DateInput
                }))
        },
        {
            type: 'singleSelect',
            flex: 3,
            minWidth: 100,
            field: 'role',
            headerName: 'Role',
            renderCell: ({ value }) => (
                <Chip
                    size='small'
                    variant='outlined'
                    label={value ?? 'user'}
                    color={
                        value === 'admin' ? 'warning'
                        :
                        value === 'vendor' ? 'secondary'
                        :
                        'primary'
                    }
                    icon={
                        value === 'admin' ? <SecurityIcon/>
                        :
                        value === 'vendor' ? <StorefrontIcon/>
                        :
                        <PersonIcon/>
                    }
                />
            ),
            valueOptions: ['admin', 'vendor', 'user'],
            filterOperators: getGridSingleSelectOperators()
                .filter(operator => operator.value === 'is')
        },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Users'
                    titleIcon={<GroupIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns={columns}
                    rows={users}
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