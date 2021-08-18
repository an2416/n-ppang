import React from 'react';
import './ListView.css';
import './Modal.css';
import ListHeader from './ListHeader';
import ListBody from './ListBody';
import Modal from './Modal';

class Listview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      itemList: [],
      listId: 0,
    };
    this.handleItem = this.handleItem.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  openModal = () => {
    this.setState({ isModalOpened: true });
  };
  closeModal = () => {
    this.setState({ isModalOpened: false });
  };

  handleItem(items) {
    items.id = this.state.listId;
    this.setState((current) => ({
      itemList: current.itemList.concat(items),
      listId: current.listId + 1,
    }));
  }

  onRemove(id) {
    this.setState((current) => ({
      itemList: current.itemList.filter((obj) => obj.id !== id),
    }));
  }

  render() {
    return (
      <>
        <div id="ListView">
          <div id="ListHeader">
            <ListHeader />
          </div>
          <div id="ListBody">
            <ListBody itemData={this.state.itemList} onRemove={this.onRemove} />
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
          header="지출 추가"
          onAddItem={this.handleItem}
          onClose={this.closeModal}
        ></Modal>
      </>
    );
  }
}

export default Listview;
