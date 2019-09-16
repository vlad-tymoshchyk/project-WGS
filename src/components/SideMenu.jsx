import React from 'react';
import SideMenuItem from './SideMenuItem';
import { FaCaretLeft } from 'react-icons/fa';
import style from './SideMenu.module.scss';

function SideMenu(props) {
  const { menuItems } = props;
  return (
    <div className="side-menu">
      <div className="clearfix">
        <FaCaretLeft className="text-white float-right m-2" />
      </div>
      <nav className="sidebar">
        <ul className="list-unstyled components">
          {menuItems.map(item => {
            return <SideMenuItem key={item.title} item={item} />;
          })}
        </ul>
      </nav>
    </div>
  );
}

export default SideMenu;
