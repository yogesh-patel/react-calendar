/**
 * Created by nikhila on 9/8/2015.
 */
let React = require('react/addons');
let DayCell = require('./DayCell');
let DayTime = require('./DayTime');
let CalendarStore = require('../stores/Calendar');

class DayHeader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            date: props.date
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date
        });
    }
    render() {
        return (
            <div className="row">
                <div className="hourheader blue-grey-text"></div>
                <div className="dayHeader blue-grey-text ng-binding">{ this.state.date.format("dddd MM/DD") }</div>
            </div>
        );
    }
}

class Day extends React.Component {
    render() {
        let style = {
            height: (window.innerHeight - 200),
            overflow: 'auto'
        };

        return (
            <div className="dayClass row">
                <DayHeader className="row" {...this.props}/>
                <div className="row" style={style}>
                    <DayTime />
                    <DayCell columntype='dayColumnBox' todaycell={ this.props.date.isSame(new Date(), 'day') }/>
                </div>
            </div>
        );
    }
}

export default Day;