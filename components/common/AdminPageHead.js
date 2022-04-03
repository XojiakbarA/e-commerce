import { Stack } from "@mui/material"
import PageTitle from "./PageTitle"

const AdminPageHead = ({ title, titleIcon }) => {

    return (
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <PageTitle title={title} titleIcon={titleIcon}/>
        </Stack>
    )
}

export default AdminPageHead