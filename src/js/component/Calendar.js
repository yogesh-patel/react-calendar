/**
 * Created by nikhila on 9/3/2015.
 */
let React = require( 'react');
let moment = require('moment');
let RightPanel = require('./RightPanel');
let Month = require('./Month');
let Day = require('./Day');
let Week = require('./Week');
let Datepicker = require('./Datepicker');
let CalendarStore = require('../stores/Calendar');
let CalendarAction = require('../actions/Calendar');

class TopNav extends React.Component {
    render() {
        return (<div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <a className="brand-logo">Test App</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a className="dropdown-button waves-effect"><i className="large mdi-action-search"></i></a></li>
                        <li><a className="dropdown-button waves-effect"><i className="large mdi-content-mail"></i></a></li>
                    </ul>
                </div>
            </nav> </div>);
    }
}

class LeftPanel extends React.Component {
    render() {
        return (<div className="col l2">
            <blockquote><h5 class="blue-grey-text">Calendar</h5></blockquote>
            <div className="divider"></div>
            <Datepicker {...this.props}/>
        </div>);
    }
}

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            module: this.getModule(CalendarStore.getSelectedView()),
            title: this.titleDateFormat(CalendarStore.getSelectedView()),
            date: CalendarStore.getSelectedDate()
        };
        this.updateZoneView = this.updateZoneView.bind(this);
        this.updateTimeView = this.updateTimeView.bind(this);
        this.titleDateFormat = this.titleDateFormat.bind(this);
        this.getModule = this.getModule.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    titleDateFormat(view) {
        switch(view.toLowerCase()) {
            case 'week':
                return [CalendarStore.getSelectedDate().format("MMM DD, YYYY"),
                    " - ",
                    CalendarStore.getSelectedDate().clone().add(1, 'week').subtract(1, 'day').format("MMM DD, YYYY")].join('');
            case 'month':
                return CalendarStore.getSelectedDate().format("MMMM YYYY");
            case 'day':
            default:
                return CalendarStore.getSelectedDate().format("dddd, MMM DD, YYYY");
        }
    }
    getModule(view) {
        switch(view.toLowerCase()) {
            case 'week':
                    return ( <Week startDate={CalendarStore.getSelectedDate()} /> );
            case 'month':
                return ( <Month date={CalendarStore.getSelectedDate()} /> );
            case 'day':
            default:
                return ( <Day date={CalendarStore.getSelectedDate()} /> );
        }
    }
    updateZoneView(view) {
        CalendarAction.setView(view);
    }
    updateTimeView(navState) {
        switch(navState) {
            case 'next':
                CalendarAction.selectedDay(CalendarStore.getSelectedDate().add(1, CalendarStore.getSelectedView()));
                break;
            case 'prev':
                CalendarAction.selectedDay(CalendarStore.getSelectedDate().subtract(1, CalendarStore.getSelectedView()));
                break;
            case 'today':
                CalendarAction.selectedDay(moment());
                break;
        }
    }
    componentDidMount() {
        CalendarStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        CalendarStore.removeChangeListener(this.onChange);
    }
    render() {
        return (
            <div>
                <TopNav />
                <div className="row">
                    <LeftPanel date={this.state.date}/>
                    <RightPanel
                        modulelToLoad={this.state.module}
                        title={this.state.title}
                        updateZoneViewHandler={this.updateZoneView}
                        updateTimeViewHandler={this.updateTimeView}/>
                </div>
            </div>
        );
    }
    onChange() {
        this.setState({
            title: this.titleDateFormat(CalendarStore.getSelectedView()),
            module: this.getModule(CalendarStore.getSelectedView()),
            date: CalendarStore.getSelectedDate()
        });
    }
}

export default Calendar;