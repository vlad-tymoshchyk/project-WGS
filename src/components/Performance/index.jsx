import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HorizontalMenu from '../utils/horizontalMenu';
import FoodConvertionRate from './FoodConvertionRate';
import Yield from './Yield';
import HatchRate from './HatchRate';

function Performance() {
  const path = '/performance';
  const submenu = [
    { title: 'Hatch rate', href: `${path}/hatch-rate` },
    { title: 'FCR', href: `${path}/fcr` },
    { title: 'Yield', href: `${path}/yield` },
    { title: 'Pupation', href: `${path}/pupation` },
    { title: 'Employees', href: `${path}/employees` },
  ];

  return (
    <div>
      <HorizontalMenu menuItems={submenu} />
      <Switch>
        <Route path={`${path}/hatch-rate`}>
          <HatchRate />
        </Route>
        <Route path={`${path}/fcr`}>
          <FoodConvertionRate />
        </Route>
        <Route path={`${path}/yield`}>
          <Yield />
        </Route>
        <Route path={`${path}/pupation`} />
        <Route path={`${path}/employees`} />
      </Switch>
    </div>
  );
}

export default Performance;
