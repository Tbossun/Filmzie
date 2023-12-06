import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { setUser } from "../../redux/features/userSlice";


const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

 

  return cloneElement(children, {
    sx: {
      color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary",
      backgroundColor: trigger ? "background.paper" : themeMode === themeModes.dark ? "transparent" : "background.paper"
    }
  });
};
const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

   const [anchorEl, setAnchorEl] = useState(null);

   const handleMenuOpen = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
     setAnchorEl(null);
   };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };


  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

   const onSignOut = () => {
     dispatch(setUser(null));
   };
  
  

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={0} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 1, display: { md: "none" } }}
                onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}>
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={
                    appState.includes(item.state) ? "contained" : "text"
                  }>
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* main menu */}

            {/* user menu */}
            <Stack spacing={1} direction="row" marginLeft={3} alignItems="center">
              {!user ? (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}>
                  Sign In
                </Button>
              ) : (
                <>
                  {/* Dropdown menu for user-related links */}
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Button
                      variant="contained"
                      onClick={handleMenuOpen} // Open the dropdown on button click
                    >
                      user
                    </Button>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleMenuClose} // Close the dropdown when it's clicked outside
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}>
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: "background.paper",
                          borderRadius: "4px",
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                          right: 0,
                          left: 0,
                          mt: 1,
                        }}>
                        {menuConfigs.user.map((item, index) => (
                          <MenuItem
                            key={index}
                            component={Link}
                            to={item.path}
                            sx={{
                              color: appState.includes(item.state)
                                ? "primary.contrastText"
                                : "text.primary",
                              mr: 1,
                            }}
                            onClick={handleMenuClose} // Close the dropdown on menu item click
                          >
                            {item.display}
                          </MenuItem>
                        ))}
                      </Box>
                    </Popover>
                  </Box>
                  {/* Dropdown menu for user-related links */}

                  <Button variant="contained" onClick={onSignOut}>
                    Logout
                  </Button>
                </>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;