import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PercentOutlined"
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

   const onSignOut = () => {
     // Implement the sign-out logic here
     // You may need to dispatch an action to clear user data in the Redux store
     dispatch(setUser(null));
   };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
      {user ? (
        // If the user is authenticated, show the "Sign Out" option
        <List sx={{ paddingX: "30px" }}>
          <Typography variant="h6" marginBottom="20px">
            AUTHENTICATION
          </Typography>
          <ListItemButton
            sx={{
              borderRadius: "10px",
              marginY: 1,
            }}
            onClick={onSignOut}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">Sign Out</Typography>
              }
            />
          </ListItemButton>
        </List>
      ) : (
        // If the user is not authenticated, show the "Sign In" option
        <List sx={{ paddingX: "30px" }}>
          <Typography variant="h6" marginBottom="20px">
            AUTHENTICATION
          </Typography>
          <ListItemButton
            sx={{
              borderRadius: "10px",
              marginY: 1,
            }}
            // component={Link}
            // to="/signin"
            onClick={() => dispatch(setAuthModalOpen(true))}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">Sign In</Typography>
              }
            />
          </ListItemButton>
        </List>
      )}
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px"
        }
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;