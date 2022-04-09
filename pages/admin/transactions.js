import { Chip, Grid } from "@mui/material"
import { getGridSingleSelectOperators, getGridStringOperators } from "@mui/x-data-grid"
import PaidIcon from '@mui/icons-material/Paid'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReplayIcon from '@mui/icons-material/Replay'
import Image from "next/image"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import PageTitle from "../../components/common/PageTitle"
import CustomDataGrid from "../../components/admin/DataGrid/DataGrid"
import GridCellExpand from "../../components/admin/DataGrid/GridCellExpand"
import { wrapper } from "../../app/store"
import { fetchTransactions } from "../../api/admin"

const Transactions = (data) => {

    const transactions = data.data
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
            type: 'number',
            flex: 2,
            minWidth: 100,
            field: 'total',
            headerName: 'Total',
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
        },
        {
            type: 'singleSelect',
            flex: 2,
            minWidth: 100,
            field: 'pay_mode',
            headerName: 'Pay Mode',
            renderCell: ({ value }) => (
                    value == 'click'
                    ?
                    <Image
                        src='/images/logo/click-logo.png'
                        alt='click-logo'
                        width={70}
                        height={26}
                    />
                    :
                    value == 'payme'
                    ?
                    <Image
                        src='/images/logo/payme-logo.png'
                        alt='click-logo'
                        width={70}
                        height={20}
                    />
                    :
                    value == 'uzcard'
                    ?
                    <Image
                        src='/images/logo/uzcard-logo.png'
                        alt='click-logo'
                        width={70}
                        height={36}
                    />
                    :
                    value == 'cod'
                    ?
                    <Image
                        src='/images/logo/cod-logo.jpeg'
                        alt='click-logo'
                        width={70}
                        height={27}
                    />
                    :
                    null
            ),
            valueOptions: ['payme', 'click', 'uzcard', 'cod'],
            filterOperators: getGridSingleSelectOperators()
                .filter(operator => operator.value === 'is')
        },
        {
            type: 'singleSelect',
            flex: 2,
            minWidth: 100,
            field: 'status',
            headerName: 'Status',
            renderCell: ({ value }) => (
                <Chip
                    size='small'
                    variant='outlined'
                    label={value}
                    icon={
                        value === 'approved' ?
                        <CheckCircleIcon/> :
                        value === 'declined' ?
                        <CancelIcon/> :
                        value === 'refunded' ?
                        <ReplayIcon/> :
                        <PendingIcon/>
                    }
                    color={
                        value === 'approved' ?
                        'success' :
                        value === 'declined' ?
                        'error' :
                        value === 'refunded' ?
                        'warning' :
                        'default'
                    }
                />
            ),
            valueOptions: ['pending', 'approved', 'declined', 'refunded'],
            filterOperators: getGridSingleSelectOperators()
                .filter(operator => operator.value === 'is')
        }
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    title='Transactions'
                    titleIcon={<PaidIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomDataGrid
                    columns={columns}
                    rows={transactions}
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
        const res = await fetchTransactions(query, cookie)
        if (res.status ===  200) {
            return {
                props: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }

})

export default Transactions

Transactions.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}