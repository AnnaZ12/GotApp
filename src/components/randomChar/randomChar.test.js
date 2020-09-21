import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';

//глобальное описание test-sute
describe('Testing <RandomChar/>', () => {
    const char = shallow(<RandomChar/>);

    describe('Testing snap & state', () => {
        it('RandomChar have rendered correctly', () => {
           // описываем что будет присходить в тест кейсе
            // expect - основная команда тест-кейса. проверяет на соответсвие
            expect(char).toMatchSnapshot();
        });
    
        it('RandomChar state "char" is empty object', () => {
            expect(char.state().char).toBeObject();
        })
    
        it('RandomChar state "loading" is true', () => {
            expect(char.state().loading).toBeTruthy();
        })
    
        it('RandomChar state "error" is false', () => {
            expect(char.state().error).toBeFalsy();
        })
    
    });

    describe('Handlers test', () => {
        it('testing onCharLoaded', () => {
            char.instance().onCharLoaded();
            expect(char.state().loading).toBeFalsy();
        });

        it('testing onError', () => {
            char.instance().onError();
            expect(char.state().loading).toBeFalsy();
            expect(char.state().error).toBeTruthy();
        });

        it('testing updateChar', () => {
            char.instance().updateChar();
            expect(char.state().loading).toBeFalsy();
        });
    });

})