import { Stack } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import PageTitle from '../../components/common/PageTitle'
import ProfileRowCard from '../../components/profile/ProfileRowCard'
import { wrapper } from '../../app/store'

const PaymentMethods = () => {
    return (
        <ProfileLayout>
            <PageTitle
                title='Payment Methods'
                titleIcon={<PaymentIcon fontSize='large' />}
                buttonText='Add New Payment Method'
                buttonIcon={<AddIcon />}
            />
            <Stack spacing={2}>
                <ProfileRowCard
                    col1='Ralf Edward'
                    col2='1234 **** **** ****'
                    col3='08 / 2022'
                />
                <ProfileRowCard
                    col1='Ralf Edward'
                    col2='ui-lib@email.com'
                    col3='N/A'
                />
            </Stack>
        </ProfileLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({getState}) => async () => {

    const user = getState().user
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

})

export default PaymentMethods