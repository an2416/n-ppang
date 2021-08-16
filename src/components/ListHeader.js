import React from 'react';
import './ListHeader.css';

const week = new Array(
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
);

class ListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDate: '',
      dayKor: '',
    };
  }

  componentDidMount() {
    this.getDate();
  }

  getDate() {
    let newDate = new Date();
    let day = newDate.getDay();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    this.setState({
      todayDate:
        year.toString() +
        '년 ' +
        month.toString() +
        '월' +
        date.toString() +
        '일',
      dayKor: week[day],
    });
  }

  render() {
    return (
      <>
        <h1>{this.state.todayDate}</h1>
        <div className="day">{this.state.dayKor}</div>
      </>
    );
  }
}

export default ListHeader;
