// Packages
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import Card from 'shared/components/Card';
import Menu from 'shared/components/Menu';
import { Block, Check } from '@mui/icons-material';
import DataTable from 'shared/components/DataTable';
import Button from 'shared/components/Buttons/Primary';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import StatusCell from 'shared/components/DataTable/Cells/Status';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

// Utilities
import useStyles from './styles';
import { UserProps } from 'shared/types/User';
import { useCommonStyles } from 'shared/assets/styles';
import { getUsers, getUsersLoading } from 'redux/users/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { deleteUserAction, getUsersList, updateUserAction } from 'redux/users/thunks';

// Component

const Table = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const users = useAppSelector(getUsers);
  // const usersError = useAppSelector(getUsersError);
  const isUsersLoading = useAppSelector(getUsersLoading);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...commonStyles };

  const [menuData, setMenuData] = useState<UserProps>();
  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);

  const genderOptions = useMemo(
    () => [
      { key: 'male', title: 'Male' },
      { key: 'female', title: 'Female' }
    ],
    []
  );

  // Callbacks
  const fetchUsers = useCallback(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleEditUser = useCallback((row) => history.push(`/users/form`, row), [history]);

  const handleDelete = useCallback(
    async ({ closeToast, _id }) => {
      closeToast();
      const response = await dispatch(deleteUserAction(_id));
      if (response.payload.success) fetchUsers();
    },
    [dispatch, fetchUsers]
  );

  const CloseButton = useCallback(
    (props) => <Button onClick={() => handleDelete(props)} sx={{ padding: '4px 12px' }} text="Yes" />,
    [handleDelete]
  );

  const handleActionsMenuClose = useCallback(() => setOpenActionsMenu(false), []);

  const handleActionsMenuClick = useCallback((row: UserProps) => {
    setMenuData(row);
    setOpenActionsMenu(true);
  }, []);

  const handleDeleteUser = useCallback(
    ({ _id }) => {
      toast('Would you like to delete this user?', {
        autoClose: false,
        closeOnClick: true,
        position: 'top-center',
        style: { alignItems: 'center', width: 400 },
        closeButton: (props) => <CloseButton _id={_id} {...props} />
      });
    },
    [CloseButton]
  );

  const renderRoleCell = useCallback(
    ({ value }) => <Typography variant="body2">{value.charAt(0).toUpperCase() + value.slice(1)}</Typography>,
    []
  );

  const renderRowActions = useCallback(
    ({ data }) => (
      <Box className={classes.rowActionBtns}>
        <IconButton className={classes.actionBtn} onClick={() => handleDeleteUser(data)}>
          <DeleteRoundedIcon fontSize="small" color="error" />
        </IconButton>
        <IconButton className={classes.actionBtn} onClick={() => handleEditUser(data)}>
          <EditRoundedIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton
          id="actions-button"
          aria-haspopup="true"
          ref={setActionsAnchorEl}
          className={classes.actionBtn}
          aria-expanded={openActionsMenu ? 'true' : undefined}
          aria-controls={openActionsMenu ? 'actions-menu' : undefined}
          onClick={() => handleActionsMenuClick(data)}>
          <MoreVertRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
    ),
    [
      openActionsMenu,
      classes.actionBtn,
      classes.rowActionBtns,
      handleEditUser,
      handleDeleteUser,
      handleActionsMenuClick
    ]
  );

  const tableData = useMemo(
    () => _.map(users, (user) => ({ ...user, gender: _.find(genderOptions, { key: user?.gender })?.title })),
    [genderOptions, users]
  );

  const tableHeaders = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1.5 },
      { field: 'gender', headerName: 'Gender', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 0.5, cellRenderer: renderRoleCell },
      { flex: 0.5, field: 'enabled', headerName: 'Status', cellRenderer: ({ value }) => <StatusCell value={value} /> },
      { flex: 0.7, minWidth: 170, field: 'actions', headerName: '', cellRenderer: renderRowActions }
    ],
    [renderRoleCell, renderRowActions]
  );

  const handleSuspendClick = useCallback(() => {
    dispatch(updateUserAction({ ...menuData, status: !menuData?.status }));
    setActionsAnchorEl(null);
    setTimeout(() => fetchUsers(), 200);
    // toast.success(`Account ${menuData?.status ? 'Deactivated' : 'Activated'} successfully`);
  }, [dispatch, fetchUsers, menuData]);

  // const handleViewProfileClick = useCallback(() => {
  //   console.debug('[handleViewProfileClick] :: ');
  //   setActionsAnchorEl(null);
  // }, []);

  // Effects
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderers Vars

  const tableProps = {
    data: tableData,
    columns: tableHeaders,
    pageSize: 25,
    loading: isUsersLoading
  };

  const actionsMenuItems = useMemo(() => {
    const isActive = menuData?.status;

    return [
      {
        key: isActive ? 'suspend' : 'activate',
        label: isActive ? 'Suspend account' : 'Activate account',
        icon: isActive ? <Block fontSize="small" /> : <Check fontSize="small" />,
        onClick: handleSuspendClick
      }
      // {
      //   key: 'profile',
      //   label: 'View Profile',
      //   icon: <Visibility fontSize="small" />,
      //   onClick: handleViewProfileClick
      // }
    ];
  }, [handleSuspendClick, menuData?.status]);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Users</Typography>
        <Button text="Add User" onClick={() => history.push('/users/form')} />
      </Box>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <DataTable tableProps={tableProps} />
          </Grid>
        </Grid>
      </Card>

      <Menu
        id="actions-menu"
        open={openActionsMenu}
        items={actionsMenuItems}
        anchorEl={actionsAnchorEl}
        onClose={handleActionsMenuClose}
        MenuListProps={{
          'aria-labelledby': 'actions-button'
        }}
      />
    </>
  );
};

export default Table;
