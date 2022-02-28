import * as type from '../actions/types'

const initialState = []

const regions = (state = initialState, action) => {

    const newState = null
    const reg_index = null
    const dist_index = null

    switch (action.type) {
        case type.SET_REGIONS:
            return action.payload

        case type.UPDATE_REGIONS:
            newState = [ ...state ]
            index = newState.findIndex(region => region.id === action.payload.id)
            newState[index] = action.payload
            return newState

        case type.UPDATE_DISTRICTS:
            newState = [ ...state ]
            reg_index = newState.findIndex(region => (
                region.districts.find(district => (
                    district.id === action.payload.id
                ))
            ))
            dist_index = newState[reg_index].districts.findIndex(district => (
                district.id === action.payload.id)
            )
            newState[reg_index].districts[dist_index] = action.payload
            return newState

        case type.DELETE_REGION:
            return state.filter(region => region.id !== action.payload)

        case type.DELETE_DISTRICT:
            newState = [ ...state ]
            reg_index = newState.findIndex(region => (
                region.districts.find(district => (
                    district.id === action.payload
                ))
            ))
            const newDistricts = newState[reg_index].districts.filter(district => district.id !== action.payload)
            newState[reg_index].districts = newDistricts
            return newState

        default:
            return state
    }
}

export default regions