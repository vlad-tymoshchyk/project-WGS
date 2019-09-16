import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogOut } from '../actions/actions';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import style from './DropdownAccountMenu.module.scss';

function DropdownAccountMenu(props) {
  const { handleLogout, username } = props;
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };
  return (
    <div className={style.container}>
      <Dropdown isOpen={menuOpened} toggle={toggleMenu}>
        <DropdownToggle tag="span">
          <span className="user-avatar mx-2" />
          <span className="user-name">
            <span className="mr-2">{username}</span>
            {menuOpened ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </DropdownToggle>
        <DropdownMenu>
          <div className={style.menuItem} onClick={handleLogout}>
            <span className="mr-4">
              <img src="/icon-logout.svg" alt="Logout icon" />
            </span>
            <span>Log Out</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: e => {
      e.preventDefault();
      console.log('logged out, done');
      dispatch(userLogOut());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(DropdownAccountMenu);
