import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import InputAdornment from '@material-ui/core/InputAdornment';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const AddCard = () => (
  <Container maxWidth="sm">
    <h1>Add card</h1>
    <AddCardForm />
  </Container>
);

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    marginTop: 0
  },
  h3: {
    marginBottom: 0,
    fontStyle: 'italic'
  }
}));

const AddCardFormBase = props => {
  const { firebase } = props;

  const classes = useStyles();

  const [mood, setMood] = useState();
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [submitted, setSubmitted] = useState();

  const alreadySubmitted = () => {
    const uid = firebase.getUserID();
    const curDay = new Date();
    const date = `${curDay.getMonth() + 1}-${curDay.getDate()}-${curDay.getFullYear()}`;
    firebase.db.ref(`day_collections/${uid}/${date}`).once('value', snapshot => {
      if (snapshot.exists()) {
        console.log('true');
        setSubmitted(true);
      }
      if (!snapshot.exists()) {
        console.log('false');
        setSubmitted(false);
      }
    });
  };

  useEffect(() => {
    alreadySubmitted();
  }, []);

  const uploadCard = e => {
    e.preventDefault();
    firebase.addDay(mood, question1, question2, question3);
    setMood('');
    setQuestion1('');
    setQuestion2('');
    setQuestion3('');
  };

  return (
    <React.Fragment>
      {submitted ? (
        <h1>
          You have already submitted todays card. :) <br /> Check back tomorrow!
        </h1>
      ) : (
        <Card>
          <CardContent style={{ padding: 0 }}>
            <form onSubmit={uploadCard}>
              <Grid container spacing={2} style={{ padding: 5 }}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ borderBottom: '1px solid #eee' }}
                  >
                    <Grid item xs={9}>
                      <Typography variant="h2">
                        <Moment format="D MMM YYYY">{new Date()}</Moment>
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ backgroundColor: '#eee' }}>
                      <Typography variant="subtitle1" align="center" color="initial">
                        Mood:
                        <br />
                        <Typography align="center" style={{ fontWeight: 900 }}>
                          <TextField
                            id="mood"
                            className={classes.textField}
                            value={mood}
                            onChange={e => setMood(e.target.value)}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              inputProps: {
                                minLength: 1,
                                maxLength: 3,
                                min: 1,
                                max: 100
                              }
                            }}
                            type="number"
                            required
                          />
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <h3 className={classes.h3}>What was the best part of today?</h3>
                      <TextField
                        value={question1}
                        name="question1"
                        id="question1"
                        autoFocus
                        onChange={e => setQuestion1(e.target.value)}
                        className={classes.textField}
                        multiline
                        rows="4"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <h3 className={classes.h3}>How can you improve tomorrow?</h3>
                      <TextField
                        value={question2}
                        name="question2"
                        id="question2"
                        onChange={e => setQuestion2(e.target.value)}
                        className={classes.textField}
                        multiline
                        rows="4"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <h3 className={classes.h3}>What are you feeling grateful for?</h3>
                      <TextField
                        value={question3}
                        name="question3"
                        id="question3"
                        onChange={e => setQuestion3(e.target.value)}
                        className={classes.textField}
                        multiline
                        rows="4"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item align="center">
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

const condition = authUser => !!authUser;

const AddCardForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(AddCardFormBase);

export default AddCard;
