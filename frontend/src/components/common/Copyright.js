import Typography from "@material-ui/core/Typography";
import React from "react";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" href="https://">
                your web site
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};
export default Copyright;