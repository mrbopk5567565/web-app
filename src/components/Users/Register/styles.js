import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import * as colors from '../../../utils/color';

const styles = makeStyles(() =>
  createStyles({
    register: {
      backgroundImage: '-webkit-linear-gradient( 136deg,rgb(149,153,226) 0%,rgb(139,198,236) 100%)',
      padding: '40px 0', 
    },
    registerPage: {
      fontFamily: 'sans-serif',
    },
    textPrimary: {
      color: 'white',
    },
    registerForm: {
      display: 'flex',
      width: '80%',
      margin: '0 auto',
      flexWrap: 'wrap',
    },
    registerAccount: {
      width: '50%',
      borderRadius: '15px 0 0 15px',
      // background: '#54e6dd',
      background: 'white',
    },
    registerAccountForm: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    },
    titleAccountForm: {
      fontSize: '24px',
      color: '#2271dd',
    },  
    checkbox: {
      marginTop: '20px',
      '& input': {
        backgroundColor: '#fafafa',
        border: '1px solid #cacece',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05)',
        padding: '9px',
        borderRadius: '3px',
        display: 'inline-block',
        width: '18px',
        height: '18px',
        margin: '0 5px 0 0',
      }
    },
    registerGeneral: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      // background: '#2271dd',
      background: '#7ed6df',
      borderRadius: '0 15px 15px 0',
    },
    registerGeneralForm: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    },
    titleGeneralForm: {
      fontSize: '24px',
      color: '#ffffff',
    },
    inputFieldLeft: {
      marginBottom: '12px',
      '& label': {
        color: '#666',
      },
      '& div input': {
        padding: '12px 15px 12px 0',
      }
    },
    
    inputFieldRight: {
      marginBottom: '12px',
      '& label': {
        color: 'white !important',
      },
      '& div div': {
        padding: '12px 15px 12px 0',
      },
      '& div input': {
        padding: '12px 15px 12px 0',
      }
    },
    labelFocus: {
      color: 'white !important',
    },
    inputDate: {
      color: 'white',
    },
    messageError: {
      marginTop: '20px',
      fontSize: '20px',
      color: `${colors.colorLogo}`,
    },
    messageTrue: {
      marginTop: '20px',
      fontSize: '20px',
      color: '#27ae60',
    },
    buttonSubmit: {
      width: '150px',
      margin: '10px auto 20px',
      padding: '10px 20px',
      borderRadius: '20px',
      border: '1px solid white',
      background: 'white',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '20px',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
    },
  })
);

export const Errors = styled.p`
  color: ${colors.colorLogo};
  margin: 0px 0 30px 10px;
  position: relative;
  padding-left: 15px;

  &:before {
    content: '!';
    color: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid ${colors.colorLogo};
    z-index: 1;
    border-radius: 3px,
  }
`

export default styles;