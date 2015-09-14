/**
 * Created by nikhila on 9/8/2015.
 */
let Dispatcher = require('flux').Dispatcher;
let AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
    this.dispatch({
        source: 'ACTION',
        action: action
    });
};

module.exports = AppDispatcher;