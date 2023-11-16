import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { MainRoutes } from './MainRoutes';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from './sidebarItems';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function MainCountainer(props: Props) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            User Management Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          [`& .MuiDrawer-paper`]: { width: 200 },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton selected={pathname.includes(item.to)} component={Link} to={item.to}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <MainRoutes />
      </Box>
    </Box>
  );
}
