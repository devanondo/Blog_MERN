import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, updateStatus } from "../../../actions/blogAction";

export default function ToolTip({ params }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.status);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
  }, [dispatch, error, success]);
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
            {params.getValue(params.id, "status")}
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
        <MenuItem
          onClick={function (e) {
            e.preventDefault();
            console.log(params.getValue(params.id, "id"));
            dispatch(
              updateStatus(params.getValue(params.id, "id"), {
                status: "decline",
              })
            );
          }}
        >
          Decline
        </MenuItem>

        <MenuItem
          onClick={function (e) {
            e.preventDefault();
            console.log(params.getValue(params.id, "id"));
            dispatch(
              updateStatus(params.getValue(params.id, "id"), {
                status: "approved",
              })
            );
          }}
        >
          Approve
        </MenuItem>
      </Menu>
    </>
  );
}
