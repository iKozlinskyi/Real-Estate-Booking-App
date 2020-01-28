import React, {Component} from 'react';
import {END_DATE, RESERVATION_DATE_FORMAT, START_DATE} from "../../utils/constants";
import isAfterDay from "../../utils/isAfterDay";
import isBeforeDay from "../../utils/isBeforeDay";
import isInclusivelyAfterDay from "../../utils/isInclusivelyAfterDay";
import BlinkMessage from "../BlinkMessage/BlinkMessage";
import {withElementClassName} from "../HOCs/withElementClassName";
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from "moment";
import isDayInRangeIncludeStartExcludeEnd from "../../utils/isDayInRangeIncludeStartExcludeEnd"
import "./DateRangePickerWrapper.css"
import "../Styles/Button.css"

class DateRangePickerWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      closestStartDate: null,
      message: null
    };

    this.reservations = this.sortReservations(this.props.reservations).map(res => ({
      startDate: moment(res.reservationStart, RESERVATION_DATE_FORMAT),
      endDate: moment(res.reservationEnd, RESERVATION_DATE_FORMAT),
    }));

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
  }

  handleDateChange({startDate, endDate}) {

    let closestStartDate;
    if (startDate) {
      closestStartDate = this.getClosestStartDate(startDate, this.reservations);
    }

    if (!(startDate || endDate)) {
      this.handleFocusChange(null);
    }

    this.setState({
      startDate,
      endDate,
      closestStartDate,
      message: null
    });
  }

  handleFocusChange(focusedInput) {
    this.setState({focusedInput})
  }

  isDayBlocked(day) {
    if (this.state.startDate) {
      const {startDate, closestStartDate} = this.state;

      return isAfterDay(day, closestStartDate) || isBeforeDay(day, startDate)
    }

    const blockedDate = this.reservations.some(reservation => {
      return isDayInRangeIncludeStartExcludeEnd(day, reservation.startDate, reservation.endDate)
    });

    return blockedDate;
  }

  getClosestStartDate(date, reservations) {

    const closestReservation =  reservations.find(reservation => {
      return isInclusivelyAfterDay(reservation.startDate, date)
    });

    return closestReservation ? closestReservation.startDate : null;
  }

  sortReservations(reservations) {
    return reservations.sort((a, b) => {
      return isAfterDay(a, b) ? -1 : 1;
    })
  }

  handleReservation() {
    const {startDate, endDate} = this.state;

    if (!(startDate && endDate)) {
      this.showMessage()
    } else {
      this.props.onReservation(startDate, endDate);
    }
  }

  showMessage() {
    this.setState({
      message: {
        type: "warning",
        text: "Please, specify desired start and end dates for your reservation"
      }
    })
  }
  render() {

    const {message} = this.state;

    return (
        <div className={`DateRangePickerWrapper ${this.props.elementClassName}`}>

          {message &&
          <BlinkMessage type={message.type} elementClassName="DateRangePickerWrapper__BlinkMessage">
            {message.text}
          </BlinkMessage>
          }

          <DateRangePicker
              startDate={this.state.startDate}
              startDateId={START_DATE}
              endDate={this.state.endDate}
              endDateId={END_DATE}
              onDatesChange={this.handleDateChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.handleFocusChange}
              isDayBlocked={this.isDayBlocked}
              displayFormat="DD/MM/YYYY"
              showClearDates
          />
          <button
              onClick={this.handleReservation}
              className="button button--link DateRangePickerWrapper__button"
          >
            Book It!
          </button>
        </div>
    );
  }
}

export default withElementClassName(DateRangePickerWrapper);