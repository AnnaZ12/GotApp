import React, {Component} from 'react';
import './itemDetails.css';


// универсальное поле вывода данных
const Field = ({item, field, label}) => {
    // item - объект, field - хар-ки объекта, label - данные с сервера
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {

    state = {
        item: null
    }

    // компонент появился на странице
    componentDidMount() {
        this.updateItem();
    }
    
    // компонент обновился 
    componentDidUpdate(prevProps) {
        // если id компонента не совпадает с id предыдущего
        if (this.props.itemId !== prevProps.itemId) {
            // обновляем айтем
            this.updateItem();
        }
    }

    // пропсы определенного айтема приходят из вышестоящих классов (страниц)
    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {
        // если айтем не выбран
        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}