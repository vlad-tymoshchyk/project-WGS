import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HorizontalMenu from '../utils/horizontalMenu';

function Manage() {
  const path = '/manage';
  const submenu = [
    { title: 'Streams', href: `${path}/streams` },
    { title: 'Schedule', href: `${path}/schedule` },
  ];

  return (
    <div>
      <HorizontalMenu menuItems={submenu} />
      <Switch>
        <Route path={`${path}/streams`} />
        <Route path={`${path}/schedule`} />
      </Switch>
    </div>
  );
}

export default Manage;
