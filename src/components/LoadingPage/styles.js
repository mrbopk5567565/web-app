import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles(() =>
  createStyles({
    body: {
      height: '100%',
      textAlign: 'center',
      background: '#242F3F',
    },
    loader: {
      display: 'inline-block',
      width: '30px',
      height: '30px',
      position: 'relative',
      border: '4px solid #Fff',
      top: '50%',
      animation: 'loader 2s infinite ease',

      '@keyframes loader': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(180deg)',
        },    
        '50%': {
          transform: 'rotate(180deg)',
        },    
        '75%': {
          transform: 'rotate(360deg)',
        },   
        '100%': {
          transform: 'rotate(360deg)',
        },
      }
    },
    loaderInner: {
      verticalAlign: 'top',
      display: 'inline-block',
      width: '100%',
      backgroundColor: '#fff',
      animation: 'loader-inner 2s infinite ease-in',

      '@keyframes loaderInner': {
        '0%': {
          height: '0%',
        },
        '25%': {
          height: '0%',
        },
        '50%': {
          height: '100%',
        },
        '75%': {
          height: '100%',
        },
        '100%': {
          height: '0%',
        },
      }
    },
  })
)

export default styles;