import React from "react";
import './index.css';
import { useTheme } from "../../ThemeContext";

function GeneralInfoComponent() {
    const theme = useTheme();
    const classNameMain = `main-${theme}`;

    return (
        <div className={classNameMain}>
            <p>
                Dear User,
            </p>
            <p>
                You have limited access and you dont have access to use Events and TimeTable module.
            </p>
        </div>
    );
}

export default GeneralInfoComponent;