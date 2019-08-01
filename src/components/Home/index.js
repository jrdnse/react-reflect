import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from 'react-linechart';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import '../../../node_modules/react-linechart/dist/styles.css';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const HomePage = props => {
  const { firebase } = props;

  const classes = useStyles();

  const data = [
    {
      color: 'blue',
      points: [{ x: '2019-10-7', y: 33 }, { x: '2019-11-30', y: 87 }]
    }
  ];

  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState();

  const getMoodData = () => {
    setLoading(true);
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
          // TODO: Show message on screen
          console.log('no data in the db');
        }
      })
      .then(() => {
        setLoading(false);
        dbRef.off();
      });
  };

  useEffect(() => getMoodData(), []);

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <h1>Home</h1>
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
  );
};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HomePage));
