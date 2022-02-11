import { Button, Divider, Stack } from "@mui/material"
import AdminSearch from "../admin/AdminSearch"
import PageTitle from "./PageTitle"
import PhoneMask from "./PhoneMask"


const AdminPageHead = ({ title, titleIcon, buttonText, onKeyUp, onClick }) => {

    return (
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <PageTitle title={title} titleIcon={titleIcon}/>
            <AdminSearch
                onKeyUp={onKeyUp}
                inputComponent={buttonText == 'By Phone' ? PhoneMask : 'input'}
                placeholder={ buttonText == 'By Phone' ? '(00) 000-00-00' : 'Search...' }
            >
                <Divider sx={{ height: 28, m: 0.5, display: 'block' }} orientation="vertical" />
                <Button size='small' onClick={onClick}>
                    {buttonText}
                </Button>
            </AdminSearch>
        </Stack>
    )
}

export default AdminPageHead