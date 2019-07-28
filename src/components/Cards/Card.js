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

const CardLayout = () => (
  <Card>
    <CardContent maxWidth="sm" style={{ padding: 0 }}>
      <Grid container spacing={2} style={{ padding: 5 }}>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={2} style={{ borderBottom: '1px solid #eee' }}>
            <Grid item xs={9} style={{ fontStyle: 'italic' }}>
              <Typography variant="h2">
                <Moment format="D MMM YYYY">12-10-1976</Moment>
              </Typography>
            </Grid>
            <Grid item xs={3} style={moodStyle()}>
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
          <Grid container>
            <Grid item style={{ fontStyle: 'italic' }}>
              <h3>What was the best part of today?</h3>
              <p>
                Suspendisse et pretium odio. Vivamus id posuere sem. Morbi vitae faucibus mi. Integer fermentum, est id condimentum fermentum, urna
                lacus cursus eros, vel varius ipsum purus id augue. Proin at tempor lacus. Mauris ultrices ipsum scelerisque, sagittis eros nec,
                congue tortor. In ac orci odio. Mauris tempus orci id urna laoreet, bibendum blandit quam convallis. In dapibus rutrum dignissim.
              </p>
            </Grid>
            <Grid item style={{ fontStyle: 'italic' }}>
              <h3>How can you improve tomorrow?</h3>
              <p>
                In hac habitasse platea dictumst. Ut iaculis facilisis sem, tincidunt posuere tortor. Fusce laoreet tristique quam id dapibus.
                Vestibulum imperdiet turpis erat, ac vulputate quam cursus ac
              </p>
            </Grid>
            <Grid item style={{ fontStyle: 'italic' }}>
              <h3>What are you feeling grateful for?</h3>
              <p>
                Morbi vitae dapibus dui. Fusce finibus ultricies arcu, quis scelerisque tortor varius nec. Quisque convallis, ante sed varius viverra,
                ante metus consequat enim, et cursus turpis nulla in turpis. Vestibulum fermentum auctor mattis. Curabitur dapibus cursus ipsum a
                ultricies.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CardLayout;
