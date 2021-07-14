import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import { authContext } from '../../../context/auth/AuthContext';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}//độ cao
    getContentAnchorEl={null}
    anchorOrigin={{ //thằng nút chỉ xuống dưới
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{ //thằng menu chỉ lên trên
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { authActions: { logoutAccount, logoutAccountAllDevice } } = authContext();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[]}
        <StyledMenuItem onClick={ ()=>{
          setAnchorEl(null);
          logoutAccount();
        }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
        <StyledMenuItem onClick={ ()=>{
          setAnchorEl(null);
          logoutAccountAllDevice();
        }}>
          <ListItemIcon>
            <DevicesOtherIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout all devices" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}