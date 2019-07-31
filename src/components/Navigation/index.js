import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountBox from '@material-ui/icons/AccountBox';
import PersonAdd from '@material-ui/icons/PersonAdd';

import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  linkMain: {
    textDecoration: 'none',
    color: 'white',
    marginRight: 'auto'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    position: 'fixed',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      position: 'static'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 999
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          component={NavLink}
          to={ROUTES.HOME}
          button
          key={1}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText>HOME</ListItemText>
        </ListItem>

        <ListItem
          component={NavLink}
          to={ROUTES.CARDS}
          button
          key={2}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <ViewCarousel />
          </ListItemIcon>
          <ListItemText>CARDS</ListItemText>
        </ListItem>

        <ListItem
          component={NavLink}
          to={ROUTES.ACCOUNT}
          button
          key={3}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText>ACCOUNT</ListItemText>
        </ListItem>

        <SignOutButton />
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to={ROUTES.HOME} className={classes.linkMain}>
            <Typography variant="h6" noWrap>
              React Reflect
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="navigation-drawer">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Fab
        color="primary"
        variant="extended"
        aria-label="delete"
        className={classes.fab}
        component={NavLink}
        to={ROUTES.ADD_CARD}
      >
        <AddIcon className={classes.extendedIcon} />
        ADD CARD
      </Fab>
    </React.Fragment>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          component={NavLink}
          to={ROUTES.LANDING}
          button
          key={1}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText>LANDING</ListItemText>
        </ListItem>

        <ListItem
          component={NavLink}
          to={ROUTES.SIGN_IN}
          button
          key={2}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>SIGN IN</ListItemText>
        </ListItem>

        <ListItem
          component={NavLink}
          to={ROUTES.SIGN_UP}
          button
          key={3}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText>SIGN UP</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to={ROUTES.LANDING} className={classes.linkMain}>
            <Typography variant="h6" noWrap>
              React Reflect
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="navigation-drawer">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Fab
        color="primary"
        variant="extended"
        aria-label="delete"
        className={classes.fab}
        component={NavLink}
        to={ROUTES.ADD_CARD}
      >
        <AddIcon className={classes.extendedIcon} />
        ADD CARD
      </Fab>
    </React.Fragment>
  );
};

export default Navigation;
