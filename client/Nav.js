import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ count, page }) => {
  const links = [
    {
      title: 'First',
      link: '/',
      disabled: count === 0 ? 'disabled' : '',
    },
    {
      title: 'Prev',
      link: `/${count - 1}`,
      onClick: page,
      disabled: count === 0 ? 'disabled' : '',
    },
    {
      title: 'Next',
      link: `/${count + 1}`,
      onClick: page,
      disabled: count === 161 ? 'disabled' : '',
    },
    {
      title: 'Last',
      link: '/161',
      disabled: count === 161 ? 'disabled' : '',
    },
  ];
  return (
    <div>
      <h1>Users</h1>
      You are viewing page {count + 1} out of 162
      <br />
      <div className="btn-group">
        {links.map(link => (
          <Link
            className={`btn btn-primary ${link.disabled}`}
            to={{ pathname: link.link, state: link.title }}
            onClick={link.onClick}
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;
