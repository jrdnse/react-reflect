import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';

const EmptyCard = () => (
  <React.Fragment>
    <EmptyCardBase />
  </React.Fragment>
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

const EmptyCardBase = props => {
  const { firebase, authUser } = props;

  const classes = useStyles();

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');

  const uploadCard = e => {
    e.preventDefault();
    console.log(firebase.doUser);
  };

  return (
    <Card>
      <CardContent maxWidth="sm" style={{ padding: 0 }}>
        <form onSubmit={uploadCard}>
          <Grid container spacing={2} style={{ padding: 5 }}>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2} style={{ borderBottom: '1px solid #eee' }}>
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
                      Happy
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
  );
};

export default withFirebase(EmptyCard);
