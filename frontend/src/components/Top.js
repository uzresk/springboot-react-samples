import React from 'react';
import {Link} from 'react-router-dom'

const Top = () => {

    return (
        <>
            <div>
                Top
            </div>
            <div>
                <Link to="/next">next page</Link>
            </div>
        </>
    );
};

export default Top;
