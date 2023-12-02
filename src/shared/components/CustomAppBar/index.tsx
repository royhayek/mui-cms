// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AppBar, Badge, Box, Hidden, IconButton, Switch, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsMenu from './components/NotificationsMenu';
import SearchIcon from '@mui/icons-material/Search';
import SearchMenu from './components/SearchMenu';
import MenuIcon from '@mui/icons-material/Menu';
import UserDropdown from '../UserDropdown';
import Menu from '../Menu';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { getThemeType, uiActions } from 'redux/services/ui/slice';
import { useCommonStyles } from 'shared/assets/styles/index.ts';
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface CustomAppBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomAppBar = ({ open, setOpen }: CustomAppBarProps) => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch();
  const updateUI = useCallback((payload) => dispatch(uiActions.update(payload)), [dispatch]);

  const theme = useSelector(getThemeType);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
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
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
  const themeValue = useMemo(() => (_.isEqual(theme, 'dark') ? true : false), [theme]);
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderDrawerMenuBtn = useMemo(
    () => (
      <IconButton size="large" edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerOpen}>
        <MenuIcon color="primary" />
      </IconButton>
    ),
    [handleDrawerOpen]
  );

  const renderLogo = useMemo(() => {
    return <Typography sx={{ flexGrow: 1 }}>AI TRAVEL PLANNER</Typography>;
  }, []);

  const renderButtons = useMemo(() => {
    return (
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
    );
  }, [handleSearchClick, handleThemeSwitch, handleNotiClick, themeValue, open]);

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
        customContent={<NotificationsMenu />}
      />
    </AppBar>
  );
};

export default CustomAppBar;