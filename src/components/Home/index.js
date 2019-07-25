import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <h2>This page is accessible only by authenticated users.</h2>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
