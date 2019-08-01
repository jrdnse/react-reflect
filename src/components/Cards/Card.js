import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const moodStyle = () => {
  const colors = ['#14B7CE', '#789CEB', '#F6D063', '#3B5B84'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return { color: 'white', backgroundColor: color };
};

const CardLayout = props => {
  const { date, mood, q1, q2, q3 } = props;

  return (
    <Card>
      <CardContent style={{ padding: 0, width: '100%' }}>
        <Grid container spacing={2} style={{ padding: 5 }}>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={2} style={{ borderBottom: '1px solid #eee' }}>
              <Grid item xs={9} style={{ fontStyle: 'italic' }}>
                <Typography variant="h2">
                  <Moment format="D MMM YYYY">{date}</Moment>
                </Typography>
              </Grid>
              <Grid item xs={3} style={moodStyle()}>
                <Typography variant="subtitle1" align="center" color="initial">
                  Mood:
                  <br />
                  <Typography align="center" style={{ fontWeight: 900 }}>
                    {mood}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container direction="column" spacing={1}>
              <Grid item style={{ fontStyle: 'italic', maxWidth: '100%' }}>
                <h3>What was the best part of today?</h3>
                <Typography variant="body1">{q1}</Typography>
              </Grid>
              <Grid item style={{ fontStyle: 'italic', maxWidth: '100%' }}>
                <h3>How can you improve tomorrow?</h3>
                <Typography variant="body1">{q2}</Typography>
              </Grid>
              <Grid item style={{ fontStyle: 'italic', maxWidth: '100%' }}>
                <h3>What are you feeling grateful for?</h3>
                <Typography variant="body1">{q3}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardLayout;
