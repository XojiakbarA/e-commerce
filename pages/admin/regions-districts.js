import { Grid } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AdminPageHead from "../../components/common/AdminPageHead"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import DataList from "../../components/admin/DataList/DataList"
import RegionListItem from "../../components/admin/DataList/DataListItem/RegionListItem"
import AddListItem from "../../components/admin/DataList/DataListItem/AddListItem"
import CustomListItem from "../../components/admin/DataList/DataListItem/ListItem"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSingleField } from "../../app/hooks/useFormik/useSingleField"
import { wrapper } from "../../app/store"
import { createDistrict, createRegion, deleteDistrict, deleteRegion, editDistrict, getRegions } from "../../app/store/actions/async/admin"
import { toggleDeleteDistrictDialog, toggleDeleteRegionDialog } from "../../app/store/actions/dialogActions"
import { nameValidationSchema } from "../../app/hooks/useFormik/validate"

const RegionsDistricts = () => {

    const dispatch = useDispatch()

    const regions = useSelector(state => state.regions)
    const {
        loading, text, region_id, district_id,
        deleteRegionDialog, deleteDistrictDialog
    } = useSelector(state => state.dialog)

    const [selected, setSelected] = useState(regions[0])

    const handleSelectedClick = (region) => {
        setSelected(region)
    }
    const closeDeleteRegionDialog = () => {
        dispatch(toggleDeleteRegionDialog(false, null, null))
    }
    const closeDeleteDistrictDialog = () => {
        dispatch(toggleDeleteDistrictDialog(false, null, null))
    }
    const handleRegionDeleteClick = () => {
        dispatch(deleteRegion(region_id, handleSelectedClick))
    }
    const handleDistrictDeleteClick = () => {
        dispatch(deleteDistrict(district_id))
    }

    const [regionEdit, setRegionEdit] = useState(false)

    const handleRegionCreateSubmit = (data, { resetForm, setSubmitting }) => {
        dispatch(createRegion(data, resetForm, setSubmitting, setRegionEdit, handleSelectedClick))
    }

    const regionFormik = useSingleField('name', null, handleRegionCreateSubmit, nameValidationSchema, regionEdit, setRegionEdit)

    const [districtCreate, setDistrictCreate] = useState(false)

    const handleDistrictCreateSubmit = (data, { resetForm, setSubmitting }) => {
        dispatch(createDistrict(selected.id, data, resetForm, setSubmitting, setDistrictCreate))
    }

    const districtFormik = useSingleField('name', null, handleDistrictCreateSubmit, nameValidationSchema, districtCreate, setDistrictCreate)

    const handleDistrictEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editDistrict(id, data, resetForm, setSubmitting, setEdit))
    }
    const openDeleteDistrictDialog = (dialogText, id) => {
        dispatch(toggleDeleteDistrictDialog(true, dialogText, id))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Regions & Districts'
                    titleIcon={<LocationOnIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={4}>
                <DataList subHeader='Regions'>
                    {
                        regions.map(region => (
                            <RegionListItem
                                key={region.id}
                                region={region}
                                selected={selected}
                                handleSelectedClick={handleSelectedClick}
                            />
                        ))
                    }
                    <AddListItem
                        formik={regionFormik}
                        edit={regionEdit}
                        placeholder='Region Name'
                        listItemText='Add Region'
                        field='name'
                    />
                </DataList>
            </Grid>
            <Grid item xs={4}>
                <DataList subHeader='Districts'>
                    {
                        selected.districts.map(district => (
                            <CustomListItem
                                key={district.id}
                                item={district}
                                field='name'
                                placeholder='District Name'
                                handleSubmitEdit={handleDistrictEditSubmit}
                                validationSchema={nameValidationSchema}
                                openDeleteDialog={openDeleteDistrictDialog}
                            />
                        ))
                    }
                    <AddListItem
                        formik={districtFormik}
                        edit={districtCreate}
                        placeholder='District Name'
                        listItemText='Add District'
                        field='name'
                    />
                </DataList>
            </Grid>
            <ConfirmDialog
                open={deleteRegionDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteRegionDialog}
                handleConfirmClick={handleRegionDeleteClick}
            />
            <ConfirmDialog
                open={deleteDistrictDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteDistrictDialog}
                handleConfirmClick={handleDistrictDeleteClick}
            />
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

    await dispatch(getRegions(cookie))

})

export default RegionsDistricts

RegionsDistricts.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}