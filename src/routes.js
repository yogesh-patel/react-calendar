/**
 * Created by nikhila on 9/3/2015.
 */
import React from 'react/addons';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import Main from './js/component/Main.js';
import People from './js/component/People.js';
import About from './js/component/About.js';

var routes = (
    <Route path="/" handler={Main}>
        <Route name="about" handler={About}/>
        <Route name="people" handler={People}/>
        <DefaultRoute handler={People}/>
    </Route> );

export default routes;