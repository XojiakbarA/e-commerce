import { ButtonBase, Stack } from '@mui/material'
import Image from 'next/image'
import { productImageURL } from '../../../../utils/utils'

const GalleryButtons = ({state, images, handleClick}) => {

    return (
        <Stack direction='row' spacing={1}>
            {
                images.map((image) => (
                    <ButtonBase
                        key={image.id}
                        sx={{
                            '&:hover': {
                                transform: 'scale(1.08)',
                                zIndex: 1
                            },
                            transform: state === image.src ? 'scale(1.08)' : 'scale(1)',
                            zIndex: state === image.src ? 1 : 0,
                            transition: '0.2s ease',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src={productImageURL + image.src}
                            alt={image.src}
                            width={100}
                            height={125}
                            onClick={ () => handleClick(image.src) }
                        />
                    </ButtonBase>
                ))
            }
        </Stack>
    );
}

export default GalleryButtons