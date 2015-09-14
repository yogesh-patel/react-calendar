/**
 * Created by nikhila on 9/8/2015.
 */
let React = require("react/addons");
let DayCell = require('./DayCell');
let DayTime = require('./DayTime');

class WeekHeader extends React.Component {
    render() {
        let dates = [];
        this.props.dates.map( (date, i) => {
            dates.push(<div key={i} className="weekheader weekday blue-grey-text">{date.format("ddd MM/DD")}</div>);
        });

        return (
            <div className="row">
                <div className="hourheader blue-grey-text"></div>
                {dates}
            </div>
        );
    }
}

class WeekCalendar extends React.Component {
    render() {
        let weeks = this.props.dates.map( (date, i) => {
            return (<DayCell key={i} columntype='weekColumnBox' todaycell={ (date.isSame(new Date(), 'day')) }></DayCell>);
        });

        let style = {
            height: (window.innerHeight - 200),
            overflow: 'auto'
        };

        return (
            <div style={style}>
                <DayTime />
                {weeks}
            </div>
        );
    }
}

class Week extends React.Component {
    constructor(props) {
        super();
        this.state = {
            startDate: props.startDate
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            startDate: nextProps.startDate
        });
    }
    render() {
        let dates = [];
        let date = this.state.startDate.clone();
        for(let i=0; i<7; i++) {
            dates.push(date);
            date = date.clone().add(1, 'day');
        }

        return (
            <div>
                <WeekHeader dates={dates} />
                <WeekCalendar dates={dates} />
            </div>
        );
    }
}

export default Week;