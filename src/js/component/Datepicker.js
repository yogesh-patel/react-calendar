/**
 * Created by nikhila on 9/9/2015.
 */
let React = require('react');
let CalendarAction = require('../actions/Calendar');
let { DatePicker } = require('material-ui');
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let moment = require('moment');
require("react-tap-event-plugin")();

let Datepicker = React.createClass({
    getInitialState: function() {
        return {
            controlledDate: this.props.date.toDate()
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            controlledDate: nextProps.date.toDate()
        });
    },
    handleChange: function(n, newDate) {
        CalendarAction.selectedDay(newDate);
    },
    formatDate: function(date) {
        return moment(date).format('DD MMMM, YYYY');
    },
    render: function() {
        let style = {
            width: '100%'
        };
        return (
            <DatePicker
                hintText="Date Input"
                showYearSelector={true}
                textFieldStyle={style}
                value={this.state.controlledDate}
                formatDate={this.formatDate}
                onChange={this.handleChange} />
        );
    }
});

export default Datepicker;