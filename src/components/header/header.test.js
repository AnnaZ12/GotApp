import React from 'react';
import Header from './header';
//import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Testing <Header/>', () => {
    it('Header have rendered correctly', () => {
       // описываем что будет присходить в тест кейсе
        const header = shallow(<Header/>);
        // expect - основная команда тест-кейса. проверяет на соответсвие
        expect(header).toMatchSnapshot();
    })
})
