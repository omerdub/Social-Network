import React, { useState } from "react";
import "./dropdown.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container" onMouseLeave={toggleOpen} onMouseEnter={toggleOpen}>
            <div className="dropdown">
                <div className="dropdown-title">
                    {title}
                </div>
                {isOpen && (
                    <div className="dropdown-content">
                        {items.map((item, index) => (
                            <div key={index} className="dropdown-menu-item">
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div >
        </div>
    );
};
