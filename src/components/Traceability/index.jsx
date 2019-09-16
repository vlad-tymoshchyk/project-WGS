import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from './Feed';
import Substrate from './Substrate';
import Equipment from './Equipment';

function Traceability() {
  const path = '/traceability';
  const submenu = [
    { title: 'Registered Feed', href: `${path}/registered-feed` },
    { title: 'Registered Substrate', href: `${path}/registered-substrate` },
    { title: 'Registered Equipment', href: `${path}/registered-equipment` },
  ];

  return (
    <div>
      <Switch>
        <Route path={`${path}/registered-feed`}>
          <Feed topmenu={submenu} />
        </Route>
        <Route path={`${path}/registered-substrate`}>
          <Substrate topmenu={submenu} />
        </Route>
        <Route path={`${path}/registered-equipment`}>
          <Equipment topmenu={submenu} />
        </Route>
      </Switch>
    </div>
  );
}

export default Traceability;
