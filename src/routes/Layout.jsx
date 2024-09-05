import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar'

function Layout() {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
        </>
    );
}

export default Layout;