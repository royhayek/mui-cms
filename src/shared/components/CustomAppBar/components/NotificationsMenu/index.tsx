// Packages
import React, { useCallback } from 'react';

// Components
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';

// Utilities
import useStyles from './styles.ts';

// Component

const NotificationsMenu = () => {
  // Statics
  const classes = useStyles();

  // Callbacks
  const handleMarkAllAsRead = useCallback(() => {
    // TODO: handle mark all as read button
  }, []);

  const handleViewAll = useCallback(() => {
    // TODO: handle view all button
  }, []);

  // Renderers
  const renderNotificationItem = useCallback(
    () => (
      <Box className={classes.notificationItemCard}>
        <Box>
          <Typography variant="body2">Mary Smith added a new post</Typography>
          <Typography variant="caption" color="secondary">
            {new Date().toDateString()}
          </Typography>
        </Box>
        <Avatar className={classes.avatar}>
          <ListAltIcon fontSize="small" />
        </Avatar>
      </Box>
    ),
    [classes.avatar, classes.notificationItemCard]
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>Notifications</Typography>
        <Button className={classes.markAsReadBtn} onClick={handleMarkAllAsRead}>
          <Typography variant="caption">Mark all as read</Typography>
        </Button>
      </Box>
      <Divider />
      <Box className={classes.body}>
        {renderNotificationItem()}
        <Divider flexItem variant="middle" />
        {renderNotificationItem()}
        <Divider flexItem variant="middle" />
        {renderNotificationItem()}
        <Button onClick={handleViewAll}>
          <Typography variant="caption">View all</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationsMenu;
