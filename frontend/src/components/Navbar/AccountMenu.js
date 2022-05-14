import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../actions/userAction";
import slugify from "../../utils/SlugGenerator";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Success", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <React.Fragment>
      {loading ? (
        ""
      ) : (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {user ? (
                  <Avatar alt="Cindy Baker" src={PF + user.profilePicture} />
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          {isAuthenticated && (
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link
                to={`/profile/${user && slugify(user?.name)}/${
                  user?._id
                }/about`}
              >
                {user.profilePicture ? (
                  <MenuItem>
                    <Avatar alt="Cindy Baker" src={PF + user.profilePicture} />
                    Profile
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Avatar sx={{ width: 32, height: 32 }} />{" "}
                  </MenuItem>
                )}
              </Link>

              {user.role === "admin" && (
                <Link to="/dashboard">
                  <MenuItem>
                    <Avatar>{<DashboardIcon />}</Avatar> Dashboard
                  </MenuItem>
                </Link>
              )}

              <Link to="/orders">
                <MenuItem>
                  <ListItemIcon>
                    <ListAltIcon fontSize="small" />
                  </ListItemIcon>
                  Blogs
                </MenuItem>
              </Link>
              <Link to="/setting">
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          )}
        </>
      )}
    </React.Fragment>
  );
}
