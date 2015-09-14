/**
 * Created by nikhila on 9/8/2015.
 */
let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let CalendarConstant = require('../constants/Calendar');
let assign = require('object-assign');
let moment = require('moment');

const DEFAULT_VIEW = 'day';
const CHANGE_EVENT = 'change';

let currMoment = moment();
let _selectedDate = {
    date: currMoment.date(),
    month: currMoment.month(),
    year: currMoment.year()
};
let _selectedView = '';

let selectedDay = function(date) {
    date = moment(date);
    _selectedDate.date = date.date();
    _selectedDate.month = date.month();
    _selectedDate.year = date.year();
};

let setView = function(view) {
    _selectedView = view || DEFAULT_VIEW;
};

let Calendar = assign({}, EventEmitter.prototype, {
    getSelectedView: function(){
        return _selectedView || DEFAULT_VIEW;
    },

    getSelectedDate: function() {
        return moment(_selectedDate);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch(action.actionType) {
            case CalendarConstant.SELECTED_DAY:
                selectedDay(action.data);
                Calendar.emitChange();
                break;

            case CalendarConstant.SET_VIEW:
                setView(action.data);
                Calendar.emitChange();
                break;
        }

        return true;
    })
});

export default Calendar;