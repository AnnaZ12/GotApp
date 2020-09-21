import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


// Класс отрисовки рандомного персонажа
export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    // компонент появился на странице, персонаж меняется по таймеру. значение таймера в пропсе по умолчанию
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    // компонент был удален со страницы через определенное время
    // componentWillUnmount прекращает жизненный цикл компонента, когда блок пропадает из разметки и останавливает запросы к серверу
    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    // функция для прекращения работы спинера -> вывода карточки персонажа
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    // функция для отрисовки сообщения об ошибке
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // обновление персонажа
    updateChar = () => {
        // выбираем рандомный id
        const id = Math.floor(Math.random()*140 + 25); //25-140
        // делаем запрос к серверу
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        // вставляем в разметку один из 3х элементов
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}


// По умолчанию устанавливаем пропс - интервал в таймер
RandomChar.defaultProps = {
    interval: 15000
}

// проверка типа данных пропса. опционально
RandomChar.propTypes = {
    // проверяем чтобы интервал был задан только числовым значением
    interval: (props, propName, componentName) => {
        const value = props[propName];

        if (typeof value === 'number' && !isNaN(value)) {
            return null;
        }
        return new TypeError(`${componentName}: ${propName} must be a number`)
    }
}

// разметка блока content - выводится сам персонаж. данные внутри меняются динамически
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}