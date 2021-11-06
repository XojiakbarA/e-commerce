import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Image from 'next/image'

const ProductGalleryButtons = ({gallery, handleClick}) => {

    return (
        <ButtonGroup>
            {
                gallery.map((img, i) => (
                    <Button key={i} sx={{padding: 0}} >
                        <Image
                            src={img.src}
                            alt={img.src}
                            width={100}
                            height={125}
                            onClick={handleClick}
                        />
                    </Button>
                ))
            }
        </ButtonGroup>
    );
}

export default ProductGalleryButtons