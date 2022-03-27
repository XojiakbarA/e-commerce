import { Box, Rating } from '@mui/material'

const RatingInput = ({ item, applyValue }) => {

    const handleFilterChange = (event) => {
        applyValue({ ...item, value: event.target.value })
    }

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'end',
                height: 42,
                pl: '20px',
            }}
        >
            <Rating
                name="custom-rating-filter-operator"
                placeholder="Filter value"
                value={Number(item.value)}
                onChange={handleFilterChange}
            />
        </Box>
    )
}

export default RatingInput