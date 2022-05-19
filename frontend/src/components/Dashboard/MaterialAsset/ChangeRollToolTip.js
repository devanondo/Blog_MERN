import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserRole } from "../../../actions/userAction";

export default function ChangeRollToolTip({ params }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Update Status">
          <button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            className="capitalize"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {params.getValue(params.id, "role")}
          </button>
        </Tooltip>
      </Box>

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
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {params.getValue(params.id, "role") === "user" ? (
          <MenuItem
            onClick={function (e) {
              e.preventDefault();
              dispatch(
                updateUserRole(params.getValue(params.id, "id"), {
                  role: "admin",
                })
              );
            }}
          >
            Admin
          </MenuItem>
        ) : (
          <MenuItem
            onClick={function (e) {
              e.preventDefault();
              dispatch(
                updateUserRole(params.getValue(params.id, "id"), {
                  role: "user",
                })
              );
            }}
          >
            User
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
