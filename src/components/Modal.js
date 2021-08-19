import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemTitle: '',
      itemCost: '',
      itemDate: new Date(),
      itemNum: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSave() {
    if (
      this.state.itemTitle === '' ||
      this.state.itemCost === '' ||
      this.state.itemDate === '' ||
      this.state.itemNum === 0
    ) {
      alert('모든 값을 입력해주세요');
      return;
    }

    let itemData = {
      id: this.state.itemId,
      title: this.state.itemTitle,
      cost: this.state.itemCost,
      date: this.state.itemDate,
      num: this.state.itemNum,
    };
    this.props.onAddItem(itemData);
    this.handleClose();
  }

  handleClose() {
    this.setState(
      {
        itemId: '',
        itemTitle: '',
        itemCost: '',
        itemDate: new Date(),
        itemNum: 1,
      },
      () => {
        this.props.onClose();
      },
    );
  }

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  componentWillReceiveProps(props) {
    if (props.selectedItem !== -1) {
      this.setState({
        itemId: props.selectedItem[0].id,
        itemTitle: props.selectedItem[0].title,
        itemCost: props.selectedItem[0].cost,
        itemDate: props.selectedItem[0].date,
        itemNum: props.selectedItem[0].num,
      });
    } else {
      this.setState({
        itemId: '',
        itemTitle: '',
        itemCost: '',
        itemDate: new Date(),
        itemNum: 1,
      });
    }
  }

  render() {
    const { open, header } = this.props;
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={this.handleClose}>
                {' '}
                &times;{' '}
              </button>
            </header>
            <main>
              <div className="itemInputBox">
                <div className="itemInputLabel">지출 항목명 </div>
                <input
                  value={this.state.itemTitle}
                  onChange={this.handleChange}
                  name="itemTitle"
                  placeholder="새로운 지출"
                />
              </div>
              <div className="itemInputBox">
                <div className="itemInputLabel">지출 날짜 </div>
                <DatePicker
                  onChangeRaw={this.handleDateChangeRaw}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                  selected={this.state.itemDate}
                  onChange={(date) => this.setState({ itemDate: date })}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="datePicker_container">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="datePicker_button"
                      >
                        {'<'}
                      </button>
                      <span className="datePicker_date">
                        {getYear(date)}년 {getMonth(date)}월
                      </span>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="datePicker_button"
                      >
                        {'>'}
                      </button>
                    </div>
                  )}
                />
              </div>
              <div className="itemInputBox">
                <div className="itemInputLabel">지출 금액 </div>
                <input
                  type="number"
                  pattern="\d*"
                  placeholder="number"
                  value={this.state.itemCost}
                  onChange={this.handleChange}
                  name="itemCost"
                  placeholder="ex) 50000"
                />
              </div>
              <div className="itemInputBox">
                <div className="itemInputLabel">
                  참여 인원 0 / {this.state.itemNum}
                </div>
              </div>
            </main>
            <footer>
              <button className="close" onClick={this.handleSave}>
                {' '}
                save{' '}
              </button>
              {'   '}
              <button className="close" onClick={this.handleClose}>
                {' '}
                close{' '}
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
}

export default Modal;
