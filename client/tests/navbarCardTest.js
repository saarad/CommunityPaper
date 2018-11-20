// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {NavbarCard} from "../src/cards/navbarCard";
import { shallow, mount } from 'enzyme';


describe('Testing elements in the header menu', () => {
    const wrapper = shallow(<NavbarCard title={'Test'} path={'Test'}/>);

    it('Check title', done => {
        let instance:? NavbarCard = NavbarCard.instance();
        expect(typeof instance).toEqual('object');
        if(instance) expect(instance.props.title).toEqual('Test');
        done();
    });

    it('Check path', done => {
       let instance:? NavbarCard = NavbarCard.instance();
       expect(typeof instance).toEqual('object');
       if(instance) expect(instance.path).toEqual('/category/' + instance.props.title);
       done();
    });
});