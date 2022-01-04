import { Stack } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import ProfileRowCard from '../../components/profile/ProfileRowCard'

const PaymentMethods = () => {
    return (
        <ProfileLayout>
            <ProfileTitle
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

export default PaymentMethods