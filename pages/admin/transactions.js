import { Grid } from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid'
import AdminPageHead from '../../components/common/AdminPageHead'
import { useAdminSearch } from '../../app/hooks/useAdminSearch'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import DataTable from "../../components/admin/DataTable"
import { fetchTransactions } from "../../api/admin"
import TransactionsTableRow from "../../components/admin/TableRows/TransactionsTableRow"

const headLabels = [
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'Total', field: 'total' },
    { label: 'Pay Mode', field: 'pay_mode' },
    { label: 'Status', field: 'status' },
]

const colSpan = (field) => {
    return  field == 'status'
            ? 2 : 0
}

function* labelsGenerator() {
    yield {label: 'By Name', field: 'name'}
    yield {label: 'By Email', field: 'email'}
    yield {label: 'By Phone', field: 'phone'}
    yield {label: 'By Pay Mode', field: 'pay_mode'}
    return {label: 'By Status', field: 'status'}
}

const Transactions = (data) => {

    const transactions = data.data
    const meta = data.meta

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Transactions'
                    titleIcon={<PaidIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        transactions.map(transaction => (
                            <TransactionsTableRow key={transaction.id} transaction={transaction}/>
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