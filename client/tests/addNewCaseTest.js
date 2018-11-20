// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {AddNewCase} from "../src/adminComponents/addNewCase";
import { shallow, mount } from 'enzyme';

describe('Testing adding a new case. This test will also validate editing a case, since they use the same validation methods', () => {
    const wrapper = shallow(<AddNewCase/>);
    let date = new Date();

    it('Testing form validation', done => {
        wrapper.title = 'SomeTitle';
        wrapper.pic = 'SomePic';
        wrapper.highlightedText = 'SomeHT';
        wrapper.time = 'SomeTime';
        wrapper.text = 'SomeText';
        wrapper.category = 'SomeCategory';
        wrapper.categories = [wrapper.category];
        wrapper.importances =[1,2,3,4,5];
        wrapper.chosenImportance = 0;
        wrapper.added = wrapper.title !== '' && wrapper.pic !== '' && wrapper.highlightedText !== '' &&
            wrapper.time !== '' && wrapper.category !== '' && wrapper.chosenImportance !== 0;
        expect(wrapper.added).toBe(false);
        done();
    });

});