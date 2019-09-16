import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './horizontalMenu.module.scss';

function HorizontalMenu(props) {
  const { menuItems, children } = props;
  return (
    <nav className={`${style.container} horizontal-menu`}>
      <ul className="nav navbar-nav navbar-expand-sm">
        {menuItems.map(item => (
          <li key={item.title} className="nav-item">
            <NavLink to={item.href} className={`${style.link} nav-link`}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={style.childredContainer}>{children}</div>
    </nav>
  );
}

export default HorizontalMenu;
