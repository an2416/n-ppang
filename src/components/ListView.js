import React from 'react';
import './ListView.css';
import './Modal.css';
import ListHeader from './ListHeader';
import ListBody from './ListBody';
import Modal from './Modal';

class Listview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }

  openModal = () => {
    this.setState({ isModalOpened: true });
  };
  closeModal = () => {
    this.setState({ isModalOpened: false });
  };

  render() {
    return (
      <>
        <div id="ListView">
          <div id="ListHeader">
            <ListHeader />
          </div>
          <div id="ListBody">
            <ListBody />
          </div>
          <div id="ListFooter">
            <button id="circleButton" onClick={this.openModal}>
              +
            </button>
          </div>
        </div>
        <Modal
          open={this.state.isModalOpened}
          close={this.closeModal}
          title="Create a chat room"
        >
          Modal Test Page
        </Modal>
      </>
    );
  }
}

export default Listview;
