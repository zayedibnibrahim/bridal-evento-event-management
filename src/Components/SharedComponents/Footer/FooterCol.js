import React from 'react';

const FooterCol = (props) => {
    return (
        <div className="col-md-3">
            <h6 style={{color: '#4A1E85'}}>{props.menuTitle ? props.menuTitle : " "}</h6>
            <ul className="list-unstyled mt-4">
                 {
                     props.menuItems.map((item, index) => <li key={index}> <a href={item.link} className="text-decoration-none text-white">{item.name}</a></li>)
                 }
            </ul>
            {props.children && props.children}
        </div>
    );
};

export default FooterCol;