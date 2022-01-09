import { Autocomplete, CircularProgress, TextField } from "@mui/material"

const AutocompleteAsync = ({
    formikKey, fieldLabel, fieldError, fieldHelperText,
    options, option, getOptionLabel, loading,
    handleChange, handleBlur, disabled
}) => {
    
    return (
        <Autocomplete
            size='small'
            disabled={disabled}
            options={options}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={getOptionLabel}
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