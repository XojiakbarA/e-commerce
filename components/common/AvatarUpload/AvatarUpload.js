import { Avatar, Badge } from "@mui/material"
import UploadButton from "./UploadButton"

const AvatarUpload = ({ setFieldValue, value, src, styles, title }) => {

    return (
        <Badge
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <UploadButton
                    setFieldValue={setFieldValue}
                    value={value}
                    title={title}
                />
            }
            sx={styles}
        >
            <Avatar src={src} sx={{height: 70, width: 70}} />
        </Badge>
    )
}

export default AvatarUpload