import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
      padding: '10px 0',
    },
    inputLabel: {
      color: 'white',
      fontWeight: '600',
      letterSpacing: '1px',
    },
  })
)

export default styles;