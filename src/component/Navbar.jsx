import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function ResponsiveAppBar() {
  const [userProfileInfo, setuserProfileInfo] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setuserProfileInfo(decode);
    console.log(decode, "");
  }, []);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const userprofile = () => {
    navigate("/profile");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ background: "#8C7569" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POLL MANAGEMENT APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLink
                style={{
                  width: "30px",
                  color: "black",
                }}
                to={"/addPoll"}
              >
                <Typography
                  sx={{
                    width: "100px",
                    color: "#8c7569",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  textAlign="center"
                >
                  ADD POLL
                </Typography>
              </NavLink>
              <NavLink
                style={{
                  width: "20px",
                  color: "black",
                }}
                to={"/userdetails"}
              >
                <Typography
                  sx={{
                    width: "100px",
                    marginTop: "10px",
                    color: "#8c7569",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  textAlign="center"
                >
                  POLL USERS
                </Typography>
              </NavLink>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POLL MANAGEMENT APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={"/addPoll"}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                add poll
              </Button>
            </NavLink>

            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={"/userdetails"}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                user details
              </Button>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userProfileInfo.username && (
                  <Avatar alt="Remy Sharp">
                    {userProfileInfo.username.charAt(0)}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                sx={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <Stack>
                  <Typography
                    sx={{
                      color: "#8c7569c7",
                    }}
                    textAlign="center"
                  >
                    <Button
                      sx={{
                        color: "#8c7569",
                        fontWeight: "bold",
                        paddingX: 1,
                      }}
                      onClick={userprofile}
                    >
                      profile
                    </Button>
                  </Typography>
                  <Typography textAlign="center">
                    <Button
                      sx={{
                        color: "#8c7569",
                        fontWeight: "bold",
                      }}
                      onClick={logout}
                    >
                      logout
                    </Button>
                  </Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
