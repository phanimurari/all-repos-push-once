import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isStarred: false,
    appointmentList: [],
    activeIdList: [],
    onlyStarred: false,
  }

  onMakingAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput, isStarred} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newList = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isMarked: isStarred,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newList],
      titleInput: '',
      dateInput: '',
    }))
  }

  onEnteringTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onEnteringDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onStarring = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))

    this.setState(prevState => ({
      activeIdList: [...prevState.activeIdList, id],
    }))
  }

  activeList = () => {
    const {activeIdList} = this.state

    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.filter(eachItem =>
        activeIdList.includes(eachItem.id),
      ),
      onlyStarred: !prevState.onlyStarred,
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentList, onlyStarred} = this.state

    const addStar = onlyStarred ? 'backFill' : ''

    return (
      <div className="mainContainer">
        <div className="appointmentContainer">
          <div className="formContainer">
            <form className="dataForm">
              <h1 className="heading">Add Appointment</h1>
              <label className="input-name" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                value={titleInput}
                id="title"
                placeholder="Title"
                className="text-input"
                onChange={this.onEnteringTitle}
              />
              <label className="input-name" htmlFor="date-input">
                DATE
              </label>
              <input
                type="date"
                value={dateInput}
                id="date-input"
                placeholder="Date"
                className="date-input"
                onChange={this.onEnteringDate}
              />
              <button
                type="submit"
                onClick={this.onMakingAppointment}
                className="addButton"
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointmentImage"
              alt="appointments"
            />
          </div>
          <hr className="divider" />
          <div className="appointmentsListContainer">
            <div className="subHeading">
              <h1 className="appointmentHeading">Appointments</h1>
              <button
                type="button"
                className={`markedButton ${addStar}`}
                onClick={this.activeList}
              >
                Starred
              </button>
            </div>
            <ul className="mainList">
              {appointmentList.map(eachItem => (
                <AppointmentItem
                  eachItem={eachItem}
                  onStarring={this.onStarring}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
