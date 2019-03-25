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
    this.page = this.page.bind(this);
    this.setPage = this.setPage.bind(this);
  }
  page(ev) {
    //Each time the user pages we set the count value by grabbing the id from the event listener passed by the link
    this.setState({
      count: ev.target.href.slice(ev.target.href.lastIndexOf('/') + 1) * 1,
    });
  }
  setPage = (id = 0) => {
    console.log(`set page tapped ${id}`);
    this.setState({ count: parseInt(id) });
  };
  render() {
    const { count } = this.state;
    const { page, setPage } = this;
    return (
      <div>
        <HashRouter>
          <Nav count={count} page={page} setPage={setPage} />
          <Route
            exact
            path="/"
            render={() => <Users id={0} setPage={setPage} />}
          />
          <Route
            path="/:id"
            render={({ match }) => (
              <Users setPage={setPage} id={match.params.id} />
            )}
          />
        </HashRouter>
      </div>
    );
  }
}
