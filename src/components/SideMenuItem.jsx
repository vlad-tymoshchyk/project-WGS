import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import style from './SideMenuItem.module.scss';

function SideMenuItem(props) {
  function toggleCollapse() {
    setIsOpen(!isOpen);
  }
  const {
    item: { title, href, icon, submenu },
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  return submenu ? (
    <>
      <li
        className={`nav-item${isOpen ? ' active' : ''}`}
        onClick={toggleCollapse}
      >
        <button className="nav-link side-menu-item">
          <img className={style.icon} src={icon} alt="Menu item icon" />
          <span className="item-title mr-1">{title}</span>
          <span className="float-right">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </button>
      </li>
      <Collapse isOpen={isOpen}>
        <ul className="list-unstyled sidebar-submenu">
          {submenu.map(item => (
            <li className="nav-item menu-item" key={item.title}>
              <NavLink className="nav-link" to={href + item.href}>
                <span className="vertical-line mr-2" />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Collapse>
    </>
  ) : (
    <li className="nav-item">
      <NavLink to={href} className="nav-link side-menu-item">
        <img className={style.icon} src={icon} alt="Menu item icon" />
        <span className="item-title">{title}</span>
      </NavLink>
    </li>
  );
}

export default SideMenuItem;
