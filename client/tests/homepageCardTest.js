// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {HomepageCard} from "../src/cards/homepageCard";
import { shallow, mount } from 'enzyme';

describe('Testing loading different pages', () => {
    const wrapper = shallow(<HomepageCard title={'Test'} pic={'NoPic'}/>);

    it('Testing title', done => {
       let instance:? HomepageCard = HomepageCard.instance();
       expect(typeof instance).toEqual('object');
       if(instance) expect(instance.props.title).toEqual('Test');
       done();
    });

    it('Testing picture link', done => {
       let instance:? HomepageCard = HomepageCard.instance();
       expect(typeof instance).toEqual('object');
       if(instance) expect(instance.props.pic).toEqual('NoPic');
       done();
    });

    it('Testing path', done => {
        let instance:? HomepageCard = HomepageCard.instance();
        expect(typeof instance).toEqual('object');
        if(instance) expect(instance.path).toEqual('/case/' + instance.props.title);
        done();
    });
});