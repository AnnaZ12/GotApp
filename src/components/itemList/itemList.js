import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

// Универсальный класс отрисовки карточек персонажей, книг, домов. 
export default class ItemList extends Component {

    state = {
        itemList: null
    }

    // компонент появляется на странице -> выполняем запрос к серверу и устанавливаем state
    //  передаются данные определенного пропса
    componentDidMount() {
        const {getData} = this.props;

        // из pages, с верхнего уровня, передаеются передаются данные определенного пропса
        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    // универсальный рендер компонента + универсальный слушатель на открытие определенного айтема 
    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}