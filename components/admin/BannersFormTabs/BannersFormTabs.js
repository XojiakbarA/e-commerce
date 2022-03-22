import { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import BannerForm from '../../forms/BannerForm'
import ConfirmDialog from '../../dialogs/ConfirmDialog'
import { useDispatch, useSelector } from 'react-redux'
import { appendToFormData } from '../../../utils/utils'
import { createBanner, deleteBanner, editBanner } from '../../../app/store/actions/async/admin'
import { toggleDeleteBannerDialog } from '../../../app/store/actions/dialogActions'

function TabPanel({children, value, index, ...other}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 2 }}>
                {children}
            </Box>
        )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const BannersFormTabs = ({ banner, handleBannerChange }) => {

    const dispatch = useDispatch()

    const { loading, deleteBannerDialog, text } = useSelector(state => state.dialog)

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const closeDeleteBannerDialog = () => {
        dispatch(toggleDeleteBannerDialog(false, null, null))
    }
    const handleSubmitEdit = (data, {setSubmitting, resetForm}) => {
        const formData = appendToFormData(data)
        dispatch(editBanner(banner.id, formData, setSubmitting, resetForm))
    }
    const handleSubmitCreate = (data, { resetForm, setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(createBanner(formData, setSubmitting, resetForm))
    }
    const handleBannerDeleteClick = () => {
        dispatch(deleteBanner(banner.id, handleBannerChange))
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        icon={<EditIcon fontSize='small'/>}
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<AddIcon fontSize='small'/>}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <BannerForm onSubmit={handleSubmitEdit} banner={banner}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BannerForm onSubmit={handleSubmitCreate}/>
            </TabPanel>
            <ConfirmDialog
                open={deleteBannerDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteBannerDialog}
                handleConfirmClick={handleBannerDeleteClick}
            />
        </Box>
    )
}

export default BannersFormTabs