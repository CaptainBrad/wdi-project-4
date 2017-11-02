import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <h1><Link to="/places">Cheap Dates</Link></h1>
      <div className="navLinks">
        {!Auth.isAuthenticated() && <Link to="/login" className="standard-button navBtn">Login</Link>}
        {!Auth.isAuthenticated() && <Link to="/register" className="standard-button navBtn">Register</Link>}
        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="standard-button navBtn">Logout</a>}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
