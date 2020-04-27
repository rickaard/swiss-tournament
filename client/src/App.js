import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NewTournamentPage from './pages/NewTourrnamentPage/NewTournamentPage';
import TournamentPage from './pages/TournamentPage/TournamentPage';
import NoTournamentPage from './pages/NoTournamentPage/NoTournamentPage';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <NewTournamentPage />
        </Route>

        <Route path="/tournament/:id">
          <TournamentPage />
        </Route>

        <Route path="/tournament/">
          <NoTournamentPage />
        </Route>




      </Switch>
    </Router>
  );
}

export default App;
