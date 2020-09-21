import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotService';

// тестируем вложенные компоненты
describe('Testing <ItemList/>', () => {
    const service = new gotService();
    const list = mount(<ItemList
                                getData={service.getAllHouses}
                                renderItem={({name}) => name}
                        />);
    
    it('Click om item list must rerender all list in 1 instance', () => {
        // установили кастомный state
        list.setState({itemList: [{name: 'wqw', id: 1}, {name: 'wow', id: 2}]});
        // имитируем клик
        //list.find('.list-group-item:first-child').simulate('click');
        list.simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    });
});