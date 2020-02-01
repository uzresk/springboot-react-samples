import React from 'react';
import {Link} from 'react-router-dom'

const Layout = () => {

    return (
        <>
            <div>
                Dashboard Page
            </div>
            <div>
                <Link to="/next">next page</Link>
            </div>
        </>
    );
};

export default Layout;
