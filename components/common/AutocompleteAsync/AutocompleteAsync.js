import { Autocomplete, CircularProgress, TextField } from "@mui/material"

const AutocompleteAsync = ({
    formikKey, fieldLabel, fieldError, fieldHelperText,
    handleBlur, options, option, loading, handleChange
}) => {
    
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
                        startAdornment: (
                            <>
                                {loading ? <CircularProgress size={20}/> : null}
                                {params.InputProps.startAdornment}
                            </>
                        )
                    }}
                />
            )}
            onBlur={handleBlur}
            value={option}
            onChange={handleChange}
        />
    )
}

export default AutocompleteAsync