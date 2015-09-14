/**
 * Created by nikhila on 9/3/2015.
 */
let React = require("react/addons");
let CalendarStore = require('../stores/Calendar');

var DayNames = React.createClass({
    render: function() {
        return <div className="row">
            <div className="weekheader blue-grey-text">Sun</div>
            <div className="weekheader blue-grey-text">Mon</div>
            <div className="weekheader blue-grey-text">Tue</div>
            <div className="weekheader blue-grey-text">Wed</div>
            <div className="weekheader blue-grey-text">Thu</div>
            <div className="weekheader blue-grey-text">Fri</div>
            <div className="weekheader blue-grey-text">Sat</div>
        </div>;
    }
});

class Week extends React.Component {
    render() {
        var days = [],
            date = this.props.date,
            month = this.props.month;

        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(<span xs={1} key={day.date.toString()}
                            className={"" + (day.isToday ? " todaycell" : "") +
                            (day.isCurrentMonth ? " datecell " : " datecell  grey lighten-5 blue-grey-text") +
                            (day.date.isSame(this.props.selected) ? " selected" : "") +
                            ((i>=6) ? " lastDayOfWeek" : "")
                            }
                            >{day.number}</span>);
            date = date.clone();
            date.add(1, "d");
        }

        return (<div className="week" key={days[0].toString()}>
            {days}
        </div>);
    }
}

class Month extends React.Component{
    constructor(props) {
        super();
        this.state = {
            month: props.dateS
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            month: nextProps.date
        });
    }
    render() {
        let style = {
            height: (window.innerHeight - 200),
            overflow: 'auto'
        };

        return (
            <section>
                <div className="row">
                    <DayNames/>
                </div>
                <div style={style}>
                    {this.renderWeeks()}
                </div>
            </section>
        );
    }
    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
        let monthIndex = date.month();
        let count = 0;

        while (!done) {
            weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.select}
                             selected={this.props.selected}/>);
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    }
}

export default Month;