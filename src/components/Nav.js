import React, { useState, useEffect, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

// example of how to use navigate manually
const navToSlicy = () => {
  navigate('/slicemasters', { replace: true });
};

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }
  li {
    //css variable named rotate
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
  }
  li:hover {
    transform: rotate(3deg);
  }
  li:nth-child(2n) {
    transform: rotate(1deg);
    &:hover {
      transform: rotate(3deg);
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">Hot now</Link>
      </li>
      <li>
        <Link to="/pizzas/">Pizzas</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slicemasters">Slicemasters</Link>
      </li>
      <li>
        <Link to="/order">Order</Link>
      </li>
    </ul>
  </NavStyles>
);
export default Nav;
