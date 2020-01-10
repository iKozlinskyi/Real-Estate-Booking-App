import React, {Component} from 'react';
import RealEstateCard from "./RealEstateCard";
import "./RealEstateList.css"


const REAL_ESTATE_CARDS_DATA = [
  {id: 1, name: "Multi Flat Family Building", imgUrl: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg", link: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg"},
  {id: 2, name: "Estate at Radical Factory", imgUrl: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg", link: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg"},
  {id: 3, name: "Great House Near Shore", imgUrl: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg", link: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg"},
  {id: 4, name: "American Dream House", imgUrl: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg", link: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg"},

  {id: 5, name: "Multi Flat Family Building", imgUrl: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg", link: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg"},
  {id: 6, name: "Estate at Radical Factory", imgUrl: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg", link: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg"},
  {id: 7, name: "Great House Near Shore", imgUrl: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg", link: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg"},
  {id: 8, name: "American Dream House", imgUrl: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg", link: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg"},

  {id: 9, name: "Multi Flat Family Building", imgUrl: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg", link: "https://www.real-estate.lviv.ua/img/complex/400x300/46/d0/46d050ee46a740501a980efe84a291d1.jpg"},
  {id: 10, name: "Estate at Radical Factory", imgUrl: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg", link: "https://www.real-estate.lviv.ua/img/objects/400x300/12/44/1244105cd3bacf0924324f7ea967f6b6.jpg"},
  {id: 11, name: "Great House Near Shore", imgUrl: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg", link: "http://www.ongoingthemes.com/homelist/wp-content/uploads/2017/07/slide2.jpg"},
  {id: 12, name: "American Dream House", imgUrl: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg", link: "https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg"},
];


class RealEstateList extends Component {
  render() {

    const realEstateCards = REAL_ESTATE_CARDS_DATA.map(data => <RealEstateCard key={data.id} {...data} />);
    return (
        <ul className="RealEstateList">
          {realEstateCards}
        </ul>
    );
  }
}

export default RealEstateList;