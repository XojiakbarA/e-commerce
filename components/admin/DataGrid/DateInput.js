import CustomDataPicker from "./CustomDataPicker"

const DateInput = ({ item, applyValue }) => {

    const handleOnChange = (value) => {
        applyValue({ ...item, value: value ?? null })
    }

    return (
        <CustomDataPicker
            label='Value'
            value={item.value}
            variant='standard'
            onChange={handleOnChange}
        />
    )
}

export default DateInput