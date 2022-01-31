import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDistricts } from "../store/actions/actionCreators"
import { getDistricts } from "../store/actions/async/common"


export const useLocation = (setFieldValue, initRegion = null, initDistrict = null) => {

    const dispatch = useDispatch()

    const regions = useSelector(state => state.regions)
    const districts = useSelector(state => state.districts.data)

    const isFetching = useSelector(state => state.districts.isFetching)

    const [region, setRegion] = useState(initRegion)
    const [district, setDistrict] = useState(initDistrict)

    const handleRegionChange = (e, value) => {
        setDistrict(null)
        setFieldValue('district_id', '')
        dispatch(setDistricts([]))
        if (value) {
            setRegion(value)
            setFieldValue('region_id', value.id)
            dispatch(getDistricts(value.id))
        } else {
            setRegion(null)
            setFieldValue('region_id', '')
            dispatch(setDistricts([]))
        }
    }

    const handleDistrictChange = (e, value) => {
        setDistrict(value)
        setFieldValue('district_id', value?.id)
    }

    return {
        regions,
        districts,
        region,
        district,
        isFetching,
        handleRegionChange,
        handleDistrictChange
    }
}