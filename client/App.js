import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import Users from './Users';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }
  nextPage() {
    this.setState({ count: this.state.count + 1 });
  }
  lastPage() {
    this.setState({ count: this.state.count - 1 });
  }

  setPage = (id = 0) => {
    console.log(id);
    if (id.type === 'click') {
      console.log(typeof id.target.href);
      if (id.target.href.split('').includes('162')) {
        id = 161;
      } else {
        id = 0;
      }
    }
    this.setState({ count: parseInt(id) });
  };
  render() {
    const { users, count } = this.state;
    const { nextPage, lastPage, setPage } = this;
    return (
      <div>
        <HashRouter>
          <Nav
            count={count}
            nextPage={nextPage}
            lastPage={lastPage}
            setPage={setPage}
          />
          <Route
            exact
            path="/"
            render={({ location, match }) => (
              <Users location={location} id={0} />
            )}
          />
          <Route
            path="/:id"
            render={({ location, match }) => (
              <Users
                location={location}
                nextPage={nextPage}
                setPage={setPage}
                count={count}
                id={match.params.id}
              />
            )}
          />
        </HashRouter>
      </div>
    );
  }
}
