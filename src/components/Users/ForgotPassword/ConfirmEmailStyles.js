import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as colors from '../../../utils/color';
import styled from 'styled-components';
import backgroundLogin from '../../../images/backgroundLogin.png';

export const styles = makeStyles(() =>
  createStyles({
    Reset: {
      backgroundImage: `url(${backgroundLogin})`,
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    inputField: {
      margin: '20px 0',
      '& div input': {
        color: 'white',
      }
    },
    Wrapper: {
      width: '500px',
      margin: '0 auto',
      padding: '50px',
      borderRadius: '30px',
    },
    h2: {
      margin: '0 0 30px 0',
      color: colors.colorLogo,
      textTransform: 'uppercase',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttons: {
      marginTop: '40px',
      textAlign: 'center',
    },
    buttonLogIn: {
      margin: '10px 20px',
      border: '1px solid black',
      width: '100px',
      color: colors.colorLogo,
    },
    buttonRegister: {
      width: '100px',
      margin: '10px 20px',
      padding: '5px 10px',
      border: '1px solid black',
      fontSize: '14px',
    },
    Link: {
      textDecoration: 'none',
      color: colors.colorLogo,
    }
  })
)

export const Errors = styled.p`
  color: ${colors.colorLogo};
  margin: 0px 0 10px 10px;
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
    border-radius: 3px;
  }
`

export default styles;