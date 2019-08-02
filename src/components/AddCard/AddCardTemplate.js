import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

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

const AddCardTemplate = props => {
  const classes = useStyles();

  const {
    disabled,
    onSubmit,
    moodValue,
    onChangeMood,
    q1Value,
    q2Value,
    q3Value,
    onChangeQ1,
    onChangeQ2,
    onChangeQ3
  } = props;

  return (
    <Card>
      <CardContent style={{ padding: 0 }}>
        <form onSubmit={onSubmit}>
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
                      <TextField
                        id="mood"
                        className={classes.textField}
                        value={moodValue}
                        onChange={onChangeMood}
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
                        disabled={disabled}
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
                    value={q1Value}
                    name="question1"
                    id="question1"
                    autoFocus
                    onChange={onChangeQ1}
                    className={classes.textField}
                    multiline
                    rows="4"
                    margin="normal"
                    fullWidth
                    disabled={disabled}
                  />
                </Grid>
                <Grid item>
                  <h3 className={classes.h3}>How can you improve tomorrow?</h3>
                  <TextField
                    value={q2Value}
                    name="question2"
                    id="question2"
                    onChange={onChangeQ2}
                    className={classes.textField}
                    multiline
                    rows="4"
                    margin="normal"
                    fullWidth
                    disabled={disabled}
                  />
                </Grid>
                <Grid item>
                  <h3 className={classes.h3}>What are you feeling grateful for?</h3>
                  <TextField
                    value={q3Value}
                    name="question3"
                    id="question3"
                    onChange={onChangeQ3}
                    className={classes.textField}
                    multiline
                    rows="4"
                    margin="normal"
                    fullWidth
                    disabled={disabled}
                  />
                </Grid>
                <Grid item align="center">
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={disabled}>
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

export default AddCardTemplate;

AddCardTemplate.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  moodValue: PropTypes.number.isRequired,
  onChangeMood: PropTypes.func.isRequired,
  q1Value: PropTypes.string.isRequired,
  q2Value: PropTypes.string.isRequired,
  q3Value: PropTypes.string.isRequired,
  onChangeQ1: PropTypes.func.isRequired,
  onChangeQ2: PropTypes.func.isRequired,
  onChangeQ3: PropTypes.func.isRequired
};
