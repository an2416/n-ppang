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
      selectedItem: -1,
    };
    this.handleItem = this.handleItem.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.itemClickEvent = this.itemClickEvent.bind(this);
  }

  openModal = () => {
    this.setState({ selectedItem: -1, isModalOpened: true });
  };
  closeModal = () => {
    this.setState({ selectedItem: -1, isModalOpened: false });
  };

  handleItem(items) {
    if (items.id !== '') {
      this.setState((current) => ({
        selectedItem: -1,
        itemList: current.itemList.map((item) => {
          if (item.id === items.id) {
            return items;
          } else {
            return item;
          }
        }),
      }));
      return;
    }
    items.id = this.state.listId;
    this.setState((current) => ({
      selectedItem: -1,
      itemList: current.itemList.concat(items),
      listId: current.listId + 1,
    }));
  }

  onRemove(id) {
    this.setState((current) => ({
      selectedItem: -1,
      itemList: current.itemList.filter((obj) => obj.id !== id),
    }));
  }

  itemClickEvent(id) {
    this.setState({ selectedItem: id, isModalOpened: true });
  }

  render() {
    return (
      <>
        <div id="ListView">
          <div id="ListHeader">
            <ListHeader />
          </div>
          <div id="ListBody">
            <ListBody
              itemClickEvent={this.itemClickEvent}
              itemData={this.state.itemList}
              onRemove={this.onRemove}
            />
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
          selectedItem={
            this.state.selectedItem === -1
              ? -1
              : this.state.itemList.filter(
                  (obj) => obj.id === this.state.selectedItem,
                )
          }
        ></Modal>
      </>
    );
  }
}

export default Listview;
