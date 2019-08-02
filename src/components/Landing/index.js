import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import bgImg from './landing-bg.svg';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    },
    marginTop: 80
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container
      fixed
      className={classes.container}
      maxWidth="lg"
      style={{ height: 800, backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat' }}
    >
      <Helmet>
        <title>RЯ :: React Reflect</title>
      </Helmet>
    </Container>
  );
};

export default LandingPage;
