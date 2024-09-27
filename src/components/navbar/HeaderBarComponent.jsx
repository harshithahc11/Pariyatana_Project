import { Avatar, Badge, Box, Grid, Stack, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import SearchComponent from "../utils/SearchComponent";
import { useNavigate } from "react-router-dom";
import useauth from "../customHooks/useauth";
const HeaderBar = () => {
  const navigate = useNavigate()
  const { name } = useauth()
  const styles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItem: "center",
    position: "sticky",
    top: "2px",
    zIndex: 99,
    boxSadhow: "5px 0 10px black",
    p: 3,
    width: "100%",
  };

  return (
    <>
      <Box
        sx={styles}
        bgcolor={"white"}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"flex-end"}
        borderBottom={"1px lightgrey solid"}

      >
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          xl={8}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SearchComponent />
          </Box>
        </Grid>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div>
            <Typography
              variant="body"
              fontSize={"1em"}
              color={"#1976D2"}
              fontWeight={"bold"}
            >
              Name:{name}
            </Typography>
            <br />
            {/* <Typography
              variant="body"
              fontSize={"1.0em"}
              color={"#cf2e2e"}
              fontWeight={"bold"}
            >
              {role_id === 2000
                ? "Super Admin"
                : role_id === 3000
                  ? "Company Admin"
                  : role_id === 4000
                    ? "Department Admin"
                    : role_id === 5000
                      ? "Employee"
                      : ""}
            </Typography>
            <br /> */}
          </div>
        </Box>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          xl={2}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              spacing={4}
              direction="row"
              sx={{
                color: "action.active",
                mr: 2,
                justifyContent: "flex-start",
              }}
            >
              <Badge color="secondary" variant="dot" badgeContent={0}>
                <NotificationsIcon />
              </Badge>
            </Stack>
            <Avatar
              src="/avatar.jpg"
              alt="not found"
              // handleAccount={ }
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default HeaderBar;
