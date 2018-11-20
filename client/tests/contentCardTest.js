// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {ContentCard} from "../src/cards/contentCard";
import {Comments} from "../src/comments";
import { shallow, mount } from 'enzyme';

describe('Testing loading different content of cases', () => {
    let comment: Comments[] = [new Comments('JEST', 'Testing')];
    const wrapper = shallow(<ContentCard title={'Test'} highlightedText={'Testing'} pic={'NoPic'} text={'Testing content'} time={'20.11'} comments={comment}/>);

    it('Testing title', done => {
       let instance:? ContentCard = ContentCard.instance();
       expect(typeof instance).toBe('object');
       if(instance) expect(instance.props.title).toEqual('Test');
       done();
    });

    it('Testing highlighted text', done => {
        let instance:? ContentCard = ContentCard.instance();
        expect(typeof instance).toBe('object');
        if(instance) expect(instance.props.highlightedText).toEqual('Testing');
        done();
    });

    it('Testing pic', done => {
        let instance:? ContentCard = ContentCard.instance();
        expect(typeof instance).toBe('object');
        if(instance) expect(instance.props.pic).toEqual('NoPic');
        done();
    });

    it('Testing text', done => {
        let instance:? ContentCard = ContentCard.instance();
        expect(typeof instance).toBe('object');
        if(instance) expect(instance.props.text).toEqual('Testing content');
        done();
    });

    it('Testing time(hardcoded)', done => {
        let instance:? ContentCard = ContentCard.instance();
        expect(typeof instance).toBe('object');
        if(instance) expect(instance.props.time).toEqual('20.11');
        done();
    });

    it('Testing comments', done => {
        let instance:? ContentCard = ContentCard.instance();
        expect(typeof instance).toBe('object');
        if(instance){
            expect(typeof instance.props.comments).toBe('object');
            expect(instance.props.comments[0].name).toEqual(comment[0].name);
            expect(instance.props.comments[0].comment).toEqual(comment[0].comment);
        }//end condition
        done();
    });
});