import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import { useContext, useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context/GlobalState';
import NewPost from './NewPost';

export default function Navbar() {
  const { user, logout } = useContext(Context);
  const [open, setOpen] = useState(false);
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);
  const history = useHistory();

  const handleClose = () => setOpen(false);

  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    logout(() => history.push('/'));
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__navlogo">
          <Link to="/home">Instagram</Link>
        </div>

        <div className="nav__menu">
          <Link to="/home">
            <HomeSharpIcon />
          </Link>
          <Link onClick={handleOpen}>
            <AddIcon />
          </Link>
          {open && <NewPost open={open} handleClose={handleClose} />}
          <div className="avatar__menu">
            <Avatar alt={user?.displayName} src={user?.photoURL} {...buttonProps} />
            <div className={isOpen ? 'visible' : ''} role="menu">
              <Link {...itemProps[0]} to="/">
                <AccountCircleIcon /> My Profile
              </Link>
              <Link {...itemProps[1]} to="/" onClick={handleLogout}>
                <ExitToAppIcon /> Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
