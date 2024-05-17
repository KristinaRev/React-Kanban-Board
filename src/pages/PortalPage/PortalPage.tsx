import React from 'react';
import Portal from "../../components/Portal";
import './PortalPage.scss';

export const PortalPage: React.FC = () => {
    return (
        <div className="PortalPage">
            <h2>Portal</h2>
            <Portal className="MyPortal" element="span">
                <h3>Portal container</h3>
            </Portal>
        </div>
    )
}
