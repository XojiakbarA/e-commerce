import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const AutocompleteAsync = ({
    formikKey, fieldLabel, fetchOptions,fieldError,
    fieldHelperText, handleBlur, setFormikValue
}) => {

    const [options, setOptions] = useState([])
    const [option, setOption] = useState(null)
    const loading = options.length === 0

    useEffect(() => {
        let active = true

        if(!loading) {
            return undefined
        }

        const getOptions = async () => {
            const res = await fetchOptions()
            setOptions(res.data.data)
            setFormikValue(formikKey, res.data.data[0].id)
            setOption(res.data.data[0])
        }

        if (active) {
            getOptions()
        }
        return () => {
            active = false
        }
    }, [loading, fetchOptions, setFormikValue, formikKey])
    
    return (
        <Autocomplete
            size='small'
            options={options}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={option => option.name}
            renderInput={params => (
                <TextField
                    {...params}
                    label={fieldLabel}
                    error={fieldError}
                    helperText={fieldHelperText}
                    name={formikKey}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
            onBlur={handleBlur}
            value={option}
            onChange={(e, value) => {
                setOption(value)
                setFormikValue(formikKey, value?.id)
            }}
        />
    )
}

export default AutocompleteAsync