import React from 'react';
import './ListBody.css';

function ListBody({ itemData, onRemove }) {
  return (
    <>
      {itemData.map((itemData) => {
        return (
          <div key={itemData.id} className="itemListContainer">
            <div className="leftContainer">
              <div>
                {itemData.date.getFullYear()}년 {itemData.date.getMonth() + 1}월{' '}
                {itemData.date.getDate()}일
              </div>
              <div>지출명 : {itemData.title}</div>
              <div>총 비용 : {itemData.cost}</div>
              <div>총 인원 : {itemData.num}명</div>
            </div>
            <div className="rightContainer">
              <button className="button" onClick={() => onRemove(itemData.id)}>
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListBody;
