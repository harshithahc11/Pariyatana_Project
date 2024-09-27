import {
  ArrowBackIosNewOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import GroupIcon from "@mui/icons-material/Group";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import SecurityUpdateOutlinedIcon from "@mui/icons-material/SecurityUpdateOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
const Items = ({ label, icon, onClickAction, active }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tooltip title={label} placement="right-start">
      <div>
        <MenuItem
          active={active}
          style={{
            // color: color,
            marginTop: 2,
            // background: active ? "#073E9A" : isHovered ? "#073E9A" : "#ffffff", // Change background color on hover
            color: active ? "#0B63F8" : isHovered ? "#0B63F8" : "black",
            borderStartStartRadius: 20,
            borderEndStartRadius: 20,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          icon={icon}
          onClick={onClickAction}
        >
          <Typography>{label}</Typography>
        </MenuItem>
      </div>
    </Tooltip>
  );
};

const SideBarComponent = () => {
  const [show, setHide] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setActiveItem(path); // Update the active item when navigating
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const logOutHandler = () => {
    localStorage.clear("paryatan");
    navigate("/");
  };
  return (
    <>
      <Box>
        <Sidebar
          collapsed={show}
          transitionDuration={500}
          backgroundColor={"white"}
          rootStyles={{
            height: "100vh",
          }}
        >
          {!show && (
            <Box
              sx={{
                textAlign: "right",
                p: 1.5,
                cursor: "pointer",
                position: "sticky",
                top: "0em",
                bgcolor: "white",
                zIndex: 99,
              }}
            >
              <ArrowBackIosNewOutlined onClick={() => setHide(true)} />
            </Box>
          )}
          {show && (
            <Box
              sx={{
                textAlign: "center",
                p: 1.5,
                cursor: "pointer",
                position: "sticky",
                top: "0em",
                bgcolor: "white",
                zIndex: 99,
              }}
            >
              <MenuOutlined onClick={() => setHide(false)} />
            </Box>
          )}
          {!show && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "sticky",
                top: "1em",
                zIndex: 99,
                bgcolor: "white",
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                LOGO
              </Typography>
            </Box>
          )}

          <Menu closeOnClick transitionDuration={500}>
            <Items
              label={"Dashboard"}
              icon={<GridViewIcon size={25} />}
              color={"black"}
              onClickAction={() => handleNavigation("/Dashboard")}
              active={activeItem === "/Dashboard"}
            />
            <Items
              label={"Manage Users"}
              icon={<GroupIcon size={25} />}
              color={"black"}
              onClickAction={() => handleNavigation("/UserManagement")}
              active={activeItem === "/UserManagement"}
            />
            <Items
              label={"Manage Company"}
              icon={<LocationCityRoundedIcon size={25} />}
              color={"black"}
              onClickAction={() => handleNavigation("/CompanyManagement")}
              active={activeItem === "/CompanyManagement"}
            />
            <Items
              label={"Manage Branch"}
              icon={<AddBusinessRoundedIcon size={25} />}
              color={"black"}
              onClickAction={() => handleNavigation("/BranchManagement")}
              active={activeItem === "/BranchManagement"}
            />
            <Items
              label={"Vendor Management"}
              icon={<SupervisedUserCircleOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"App Management"}
              icon={<SecurityUpdateOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Content Management"}
              icon={<FolderCopyOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Billing & Payment"}
              icon={<PaymentsOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Setting & Configuration"}
              icon={<SettingsOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Super Admin Profile"}
              icon={<ManageAccountsOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Notification & alert"}
              icon={<NotificationsOutlinedIcon size={25} />}
              color={"black"}
            />
            <Items
              label={"Log Out"}
              icon={<LoginOutlined size={25} />}
              color={"black"}
              onClickAction={() => logOutHandler()}
            />
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
};

export default SideBarComponent;
