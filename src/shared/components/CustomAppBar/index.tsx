// Packages
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useMemo, useState } from 'react';

// Components
import Menu from '../Menu';
import UserDropdown from '../UserDropdown';
import MenuIcon from '@mui/icons-material/Menu';
import SearchMenu from './components/SearchMenu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsMenuIcon from './components/NotificationsMenu';
import { AppBar, Badge, Box, Hidden, IconButton, Switch, Toolbar, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';
import { getThemeType, uiActions } from 'redux/services/ui/slice';

// Component

interface CustomAppBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomAppBar = ({ open, setOpen }: CustomAppBarProps) => {
  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const updateUI = useCallback((payload) => dispatch(uiActions.update(payload)), [dispatch]);

  const theme = useSelector(getThemeType);

  // Callbacks
  const handleDrawerOpen = useCallback(() => {
    setOpen((cur) => !cur);
  }, [setOpen]);

  const handleNotiClose = useCallback(() => {
    setNotiAnchorEl(null);
  }, []);

  const handleNotiClick = useCallback((event) => {
    setNotiAnchorEl(event.currentTarget);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchAnchorEl(null);
  }, []);

  const handleSearchClick = useCallback((event) => {
    setSearchAnchorEl(event.currentTarget);
  }, []);

  const handleThemeSwitch = useCallback(
    (event, checked) => updateUI({ theme: checked ? 'dark' : 'light' }),
    [updateUI]
  );

  // Renderers Vars
  const themeValue = useMemo(() => (_.isEqual(theme, 'dark') ? true : false), [theme]);

  // Renderers
  const renderDrawerMenuBtn = useMemo(
    () => (
      <IconButton size="large" edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerOpen}>
        <MenuIcon color="primary" />
      </IconButton>
    ),
    [handleDrawerOpen]
  );

  const renderLogo = useMemo(() => <Typography sx={{ flexGrow: 1 }}>AI TRAVEL PLANNER</Typography>, []);

  const renderButtons = useMemo(
    () => (
      <Box sx={{ mr: 3 }}>
        <Switch color="primary" checked={themeValue} onChange={handleThemeSwitch} />
        <IconButton
          id="search-button"
          aria-controls={open ? 'search-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleSearchClick}>
          <Badge color="primary" variant="dot" invisible={true}>
            <SearchIcon fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton
          id="notifications-button"
          aria-controls={open ? 'notifications-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleNotiClick}>
          <Badge color="primary" variant="dot" invisible={false}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>
    ),
    [handleSearchClick, handleThemeSwitch, handleNotiClick, themeValue, open]
  );

  const renderDropDown = useMemo(
    () => (
      <Hidden mdDown>
        <UserDropdown />
      </Hidden>
    ),
    []
  );

  return (
    <AppBar position="fixed" elevation={0} className={classes.appbar} color="inherit">
      <Toolbar>
        {renderDrawerMenuBtn}
        {renderLogo}
        {renderButtons}
        {renderDropDown}
      </Toolbar>

      <Menu
        id="search-menu"
        anchorEl={searchAnchorEl}
        onClose={handleSearchClose}
        open={Boolean(searchAnchorEl)}
        customContent={<SearchMenu />}
      />

      <Menu
        id="notifications-menu"
        anchorEl={notiAnchorEl}
        onClose={handleNotiClose}
        open={Boolean(notiAnchorEl)}
        customContent={<NotificationsMenuIcon />}
      />
    </AppBar>
  );
};

export default CustomAppBar;
