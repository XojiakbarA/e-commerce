import { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import BannerForm from '../../forms/BannerForm'
import ConfirmDialog from '../../dialogs/ConfirmDialog'
import { useToggle } from '../../../app/hooks/useToggle'
import { useDispatch } from 'react-redux'
import { appendToFormData } from '../../../utils/utils'
import { createBanner, editBanner } from '../../../app/store/actions/async/admin'
import { useBanner } from '../../../app/hooks/useFormik/useBanner'

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

    const { deleteBannerDialog, closeDeleteBannerDialog } = useToggle()

    const { isOpen, text, payload } = deleteBannerDialog

    const { isSubmitting, handleDeleteConfirmClick } = useBanner(payload, null, handleBannerChange)

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleSubmitEdit = (data, {setSubmitting, resetForm}) => {
        const formData = appendToFormData(data)
        dispatch(editBanner(banner.id, formData, setSubmitting, resetForm))
    }
    const handleSubmitCreate = (data, { resetForm, setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(createBanner(formData, setSubmitting, resetForm))
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
                open={isOpen}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteBannerDialog}
                handleConfirmClick={handleDeleteConfirmClick}
            />
        </Box>
    )
}

export default BannersFormTabs