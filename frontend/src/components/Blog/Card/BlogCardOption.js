import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import slugify from "../../../utils/SlugGenerator";

export default function BlogCardOption({ id: blogid }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  console.log(id);

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
            className="rounded-full w-7 h-7 bg-gray-500 text-white"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
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
        <MenuItem>
          <Link
            to={`/profile/${
              user && slugify(user?.name)
            }/${id}/blogs/edit/${blogid}`}
            className="text-xs font-bold text-blue-500 capitalize"
          >
            Edit
          </Link>
        </MenuItem>

        <MenuItem
          onClick={function (e) {
            e.preventDefault();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
