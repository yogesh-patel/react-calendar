/**
 * Created by nikhila on 9/8/2015.
 */
let AppDispatcher = require('../dispatcher/AppDispatcher');
let CalendarConstants = require('../constants/Calendar');

let CalendarActions = {
    selectedDay(selectedDay) {
        AppDispatcher.handleAction({
            actionType: CalendarConstants.SELECTED_DAY,
            data: selectedDay
        });
    },
    updatedMonth(updatedMonth) {
        AppDispatcher.handleAction({
            actionType: CalendarConstants.UPDATED_MONTH,
            data: updatedMonth
        });
    },
    setView(view) {
        AppDispatcher.handleAction({
            actionType: CalendarConstants.SET_VIEW,
            data: view
        });
    }
};

module.exports = CalendarActions;