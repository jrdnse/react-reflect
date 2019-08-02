import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { withAuthorization } from '../Session';
import Firebase, { withFirebase } from '../Firebase';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    marginTop: 80,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const HomePage = props => {
  const { firebase } = props;

  const classes = useStyles();

  const [moodData, setMoodData] = useState([]);

  const getMoodData = () => {
    const uid = firebase.getUserID();
    let moods = [];

    const dbRef = firebase.db.ref(`day_collections/${uid}/`);

    dbRef
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const cardsObject = snapshot.val();
          Object.keys(cardsObject).forEach(card => {
            const cCard = {
              x: card,
              y: cardsObject[card].mood
            };
            moods = [...moods, cCard];
          });
          setMoodData([
            {
              color: 'steelblue',
              points: moods
            }
          ]);
        }
        if (!snapshot.exists()) {
          props.enqueueSnackbar('No data to visualize!', {
            variant: 'info'
          });
        }
      })
      .then(() => {
        dbRef.off();
      });
  };

  useEffect(() => getMoodData(), []);

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <h1>Home</h1>
      <Container>
        <h3 style={{ marginBottom: -30 }}>Average mood chart:</h3>
        <LineChart
          xLabel="DATE"
          yLabel="MOOD"
          yMin={0}
          yMax={100}
          width={600}
          height={400}
          data={moodData}
          isDate
          hidePoints
        />
      </Container>
    </Container>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withSnackbar,
  withAuthorization(condition)
)(HomePage);

HomePage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};
