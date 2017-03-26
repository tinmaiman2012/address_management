import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Link, NavLink } from 'react-router-dom';

import Logo from './Logo.js';
import theme from './PurpleAppBar.scss';

const PurpleAppBar = ({ children, ...other }) => (
  <AppBar {...other} theme={theme}>
      <Logo />
      <span className="logo-text"> <Link to="/">ADDRESS MANAGEMENT</Link></span>

      {children}
  </AppBar>
);

PurpleAppBar.propTypes = {
  children: PropTypes.node
};

export default PurpleAppBar;
