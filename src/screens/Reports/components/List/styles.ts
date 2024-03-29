// Theme
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Styles

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between'
  },
  itemContainer: {
    padding: 16,
    minHeight: 110,
    borderRadius: 4,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.divider}`
  }
}));

export default useStyles;
