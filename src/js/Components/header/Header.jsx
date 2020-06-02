import React from 'react';

const Header = ({ toggleEasterEgg }) => (
    <div className="header-background">
        <div className="header container">
            <span className="large-circle"/>
            <p>Megafon</p>
            <span className="small-circle" />
            <span className="small-circle" onClick={toggleEasterEgg} />
            <span className="small-circle" />
        </div>
    </div>
);

export default Header;