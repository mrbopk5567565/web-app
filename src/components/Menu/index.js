import React, {useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, CssBaseline, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import useStyles from './styles';
import Vinova_Logo from '../../images/Vinova_Logo.png';

import Profile from '../../components/Profile';
import Discuss from '../../components/Discuss';
import Mentor from '../../components/Mentor';
import InternsList from '../../components/InternsList';
import InternDetail from '../InternsList/InternDetail';
import Assignments from '../Assignments'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../utils/common';
import * as userConstant from '../../redux/constants/userConstants';

function Menu(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [ role, setRole ] = useState( localStorage.getItem('role') === "intern" ? "intern-home" : "mentor-home" )

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listMenu = () => {
    if ( role === "intern-home") {
      return [
        {
          text: 'Discuss',
          link: '/discuss'
        },
        {
          text: 'Mentor',
          link: '/mentor'
        },
        {
          text: 'Profile',
          link: '/profile'
        },
        {
          text: 'Log out',
          link: '/'
        },
      ]
    } else {
      return [
        {
          text: 'Interns List',
          link: '/interns-list',
        },
        {
          text: 'Assignments',
          link: '/assignments',
        },
        {
          text: 'Profile',
          link: '/profile'
        },
        {
          text: 'Log out',
          link: '/'
        },
      ]
    }
  }

  const IconMenu = (text) => {
    switch (text) {
      case 'Discuss':
        return <HomeIcon/>
      case 'Mentor':
        return <LocalLibraryIcon/>
      case 'Profile':
        return <AssignmentIndIcon/>
      case 'Log out':
        return <ExitToAppIcon/>
      case 'Interns List':
        return <AssignmentIndIcon/>
      case 'Assignments':
        return <AssignmentIcon/>
      default:
        break;
    }
  }

  const logOut = (item) => {
    if (item.text === 'Log out'){
      logout();
      props.dispatch({ type: userConstant.LOGOUT })
      props.history.push("/login")
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={ classes.colorToolbar }>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {/* Persistent drawer */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <img src={ Vinova_Logo }/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {listMenu().map((item, index) => (
            <ListItem button key={item.text} onClick={ () => logOut(item) }>
              <ListItemIcon>
                {IconMenu(item.text)}
              </ListItemIcon>
              <Link className={ classes.linkItemMenu } to={`/${role}${item.link}`}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        { role === "intern-home" &&
          <Switch>
            <Route path={`/${role}/discuss`} component={ Discuss }/>
            <Route path={`/${role}/profile`} component={ Profile }/>
            <Route path={`/${role}/mentor`} component={ Mentor }/>
          </Switch>
        }
        { role === "mentor-home" &&
          <Switch>
            <Route exact path={`/${role}/assignments`} component={ Assignments }/>
            <Route path={`/${role}/profile`} component={ Profile }/>
            <Route exact path={`/${role}/interns-list`} component={ InternsList }/>
            <Route exact path={`/${role}/interns-list/intern-detail/:page/:id`} component={ InternDetail }/>
          </Switch>
        }
      </main>
    </div>
  );
}

export default connect()(Menu);
