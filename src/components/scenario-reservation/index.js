import React from 'react';
import PropTypes from 'prop-types';
import ScenarioReservationWrapper from './ScenarioReservationWrapper';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import ScenarioTimeList from './ScenarioTimeList';
import moment from 'moment';


/**
 * This component allwos to check an scenario availabillity, and pick a range of hours to
 * make a reservation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ScenarioReservation extends React.Component {
    state = {
        loading         : true,
        reservations    : [],
        timeList        : [],
        selectedFrom    : null,
        selectedTo      : null,
        isValid         : false,
    };

    componentDidMount() {
        const timeList = this.getTimeList();
        this.setState({
            timeList,
        });
        this.fetchData();
        addMessage("Ya hay horarios ya reservados en medio");
    }

    async fetchData() {
        const {
            scenarioCode,
            date,
            doPost,
        } = this.props;
        let reservations = [];
        this.setState({loading : true});
        try {
            const response = await doPost(endpoints.escenarios.reservas, {
                escenario   : scenarioCode,
                fecha       : date,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al consultar la reservas del escenario");
                consoleError("Fetch scenario reservation:", response);
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                reservations = response;
            }
        } catch(response) {
            addMessage("Ocurrió un error al consultar la reservas del escenario");
            consoleError("Fetch scenario reservation:", response);
        } finally {
            this.setState({loading : false, reservations}, () => {
                this.setState({
                    timeList : this.getTimeList(),
                });
            });
        }        
    }

    onRefresh() {
        // You can aply some logic onlly on reload.
        this.fetchData();
    }
    
    /**
     * this function returns an object with the time format using am/pm 
     * @param {*} number 
     */
    resolveHoursLabel(number) {
        return {
            meridian : number < 12? 'am' : 'pm',
            numberLabel : number > 12? number - 12 : number,
        };
    }

    /**
     * This function fills the time list array with values.
     */
    getTimeList() {
        const {
            initialHour = 6,
            endHour     = 24,
            date,
        } = this.props;        
        const timeList = [];
        const resolveTimeNumber = (number) => number < 10? `0${number}` : number;        
        const resolveTimeNumberLabel = (number) => {
            const {meridian, numberLabel} = this.resolveHoursLabel(number);
            return `${number < 10? '0' : '' }${numberLabel}:00 ${meridian}`;
        };

        for(let i = initialHour; i <= endHour; i ++) {
            const timeLabel = resolveTimeNumberLabel(i);
            const time = `${date} ${resolveTimeNumber(i <24? i : 0)}:00`;
            const reserved = this.isReserved(time);
            const timeItem = {
                time,
                timeLabel,
                reserved,
                hours : i,
                startsAtMinute : 0,
                endAtMinute : 59, 
            };
            timeList.push(timeItem);
        }

        return timeList;
    }

    /**
     * This function allows to check if a specific timeblock is reserved.
     * @param {*} date 
     */
    isReserved(date) {
        const {
            reservations=[],
        } = this.state;
        if(reservations.length === 0) return false;
        let reserved = false;
        for(let i = 0; i < reservations.length; i ++) {
            const reservation = reservations[i];
            const {fecha_desde:dateFrom, fecha_hasta:dateTo} = reservation;
            if(!dateFrom || !dateTo) continue;
            reserved = this.dateIsIn(date, dateFrom, dateTo);
            if(reserved) break;
        }
        return reserved;
    }

    /**
     * This function allows to check if a date is between two dates.
     * @param {*} date 
     * @param {*} from 
     * @param {*} to 
     */
    dateIsIn(date, from, to) {
        const currDate = moment(date), fromDate = moment(from), toDate = moment(to);
        const isEqualsToFrom = fromDate.diff(currDate, 'minutes') === 0;
        const isLowerThenTo  = toDate.diff(currDate, 'minutes') > 0;
        const isGreatherTheFrom = currDate.diff(fromDate, 'minutes') > 0;
        return (isEqualsToFrom || isGreatherTheFrom) && isLowerThenTo;
    }

    /**
     * This function is triggered when the user select aa time block.
     * @param {*} item 
     * @param {*} key 
     */
    onSelect(item, key) {
        let {selectedFrom:from, selectedTo:to} = this.state;
        const empty = value => value === null;

        if(empty(from) && empty(to)) { // If no selection
            from = key;
        } else if(!empty(from) && empty(to) && key === from) { // If selected first and then selected again.
            from = null;
        }  else if(!empty(from) && empty(to) && key < from) { // If selected less after first selection.
            to = from;
            from = key;            
        } else if(!empty(from) && !empty(to) && key < from) { // If both selected and then selected less
            from = key;
        } else if(!empty(from) && empty(to) || (!empty(from) && !empty(to) && key > to) || (!empty(from) && !empty(to) && (key < to && key > from))) { 
            to = key;
        } else if(!empty(from) && !empty(to) && (key === from || key === to)) {
            to = null;
        }

        this.setState({
            selectedFrom : from,
            selectedTo : to,
            isValid : from !== null,
        }, () => {
            if(from !== null && to !== null) {
                const isValid = this.isValid();
                if(!isValid) {
                    addMessage("Ya hay horarios ya reservados en medio");
                }
                this.setState({
                    isValid,
                });
            }
        });
    }

    /**
     * This function validates if a block is selected.
     * @param {*} key 
     */
    isSelected(key) {
        let {selectedFrom, selectedTo} = this.state;
        if(selectedFrom !== null && selectedTo === null) {
            return selectedFrom === key;
        } else if(selectedFrom !== null && selectedTo !== null){
            return key >= selectedFrom && key <= selectedTo;
        } else {
            return false;
        }        
    }

    /**
     * This function returns where the range starts and in which position it ends.
     */
    getSelectedLabel() {
        const {
            selectedFrom:from, selectedTo:to, timeList,
        } = this.state;
        let fromLabel = "", endLabel = "";
        const prepareNumber = number => `${number < 10? '0' : ''}${number}`;
        const format = (hours, minutes, meridian) => `${prepareNumber(hours)}:${prepareNumber(minutes)} ${meridian}`;
        if(from !== null && to === null) {
            const {hours, endAtMinute:endsAt, startsAtMinute:startsAt,} = timeList[from];
            const {numberLabel, meridian} = this.resolveHoursLabel(hours);
            fromLabel = format(numberLabel, startsAt, meridian);
            endLabel = format(numberLabel, endsAt, meridian);
        } else if(from !== null && to !== null) {
            const {hours:startHour, startsAtMinute:startStartAt} = timeList[from];
            const {hours:endHour, endAtMinute:endEndsAt} = timeList[to];
            const {numberLabel:startHourLabel, meridian:startMeridian} = this.resolveHoursLabel(startHour);
            const {numberLabel:endHourLabel, meridian:endMeridian} = this.resolveHoursLabel(endHour);
            fromLabel = format(startHourLabel, startStartAt, startMeridian);
            endLabel = format(endHourLabel, endEndsAt, endMeridian);
        }
        return {
            start   : fromLabel, 
            end     : endLabel,
        };
    }

    /**
     * This function validates if the selected range is valid, 
     * it's valid if there is not reserved blocks in middle.
     */
    isValid() {
        const {
            timeList,
            selectedFrom:from,
            selectedTo:to,
        } = this.state;
        if(from === null && to === null) return false;
        else if(from !== null && to !== null) {
            let isReserved = false;
            for(let i = from; i < (to + 1); i ++) {
                const {reserved} = timeList[i];
                if(reserved === true) {
                    isReserved = true;
                    break;
                }
            };
            return !isReserved;
        } else {
            return true;
        }
    }

    /**
     * This function validates the selected range and returns a text
     * indicating where the range stars and in which position it ends
     */
    getRangeMessage() {
        const {start='', end=''} = this.getSelectedLabel();
        return `${start} a ${end}`;
    }

    /**
     * This function is triggered when the user accepts the selecion.
     */
    onAccept() {
        const {
            selectedFrom:from,
            selectedTo:to,
            timeList,
        } = this.state;
        const {onAccept, date} = this.props;
        let timeFrom = null, timeTo;
        const prepareNumber = number => `${number < 10? '0' : ''}${number}`;
        
        if(from !== null && to === null) { // if only the first part of the range was selected.
            const {hours, endAtMinute:end, startsAtMinute:start} = timeList[from];
            const startHourlabel = `${date} ${prepareNumber(hours)}:${prepareNumber(start)}:00`;
            const endHourLabel = `${date} ${prepareNumber(hours)}:${prepareNumber(end)}:00`;
            const dateFrom = moment(`${startHourlabel}`);
            const dateTo = moment(`${endHourLabel}`).add(1, 'minute');
            timeFrom = dateFrom.format("YYYY-MM-DD HH:mm:ss");
            timeTo = dateTo.format("YYYY-MM-DD HH:mm:ss");
        } else if(from !== null && to !== null) {
            const {hours:startHours, startsAtMinute:initialStart} = timeList[from];
            const {hours:endHours, endAtMinute:finalEnd} = timeList[to];
            const startHourlabel = `${date} ${prepareNumber(startHours)}:${prepareNumber(initialStart)}:00`;
            const endHourLabel = `${date} ${prepareNumber(endHours)}:${prepareNumber(finalEnd)}:00`;
            const dateFrom = moment(`${startHourlabel}`);
            const dateTo = moment(`${endHourLabel}`).add(1, 'minute');            
            timeFrom = dateFrom.format("YYYY-MM-DD HH:mm:ss");
            timeTo = dateTo.format("YYYY-MM-DD HH:mm:ss");
        } else {
            return false;
        }

        const data = {
            fromLabel : timeFrom,
            toLabel : timeTo,
        };

        if(this.props.onAccept) {
            onAccept(data);
        }
    }

    render() {
        const {
            loading,
            timeList=[],
            selectedFrom,
            isValid,
        } = this.state;
        const isSelected = selectedFrom !== null && isValid;
        const message = `Reservar de ${this.getRangeMessage()}`;
        return (
            <ScenarioReservationWrapper
                loading         = { loading                 }
                onRefresh       = { () => this.onRefresh()  }
                selectionDone   = { isSelected              }
                selectedMessage = { message                 }
                onAccept        = { this.onAccept.bind(this)}
            >
                <ScenarioTimeList 
                    timeList    = { timeList                    } 
                    onSelect    = { this.onSelect.bind(this)    }
                    isSelected  = { this.isSelected.bind(this)  }
                />                
            </ScenarioReservationWrapper>
        );
    }
}

ScenarioReservation.propTypes = {
    scenarioCode    : PropTypes.any,
    date            : PropTypes.any,
    doPost          : PropTypes.func,
    initialHour     : PropTypes.number,
    step            : PropTypes.number,
    onAccept        : PropTypes.func,
};

export default withApi(ScenarioReservation);