import Drawer from '@mui/material/Drawer'
import SearchSidebar from './SearchSidebar'

const SearchSidebarMobile = ({categories, brands, sidebar, handleSidebarClose}) => {
    
    return (
        <Drawer
            anchor='left'
            open={sidebar}
            onClose={handleSidebarClose}
        >
            <SearchSidebar categories={categories} brands={brands} />
        </Drawer>
    );
}

export default SearchSidebarMobile