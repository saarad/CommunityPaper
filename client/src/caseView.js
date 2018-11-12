// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';
import {CaseService} from "./services";
import {ContentCard} from "./cards/contentCard";

let caseService = new CaseService();

export class CaseView extends Component<{match: {params: {title: string}}}>{
    title: string = '';
    pic: string = '';
    highlight: string = '';
    text: string ='';
    time: string = '';

    render(){
        return(
            <ContentCard title={this.title} highlightedText={this.highlight} pic={this.pic}
                         text={this.text} time={this.time}/>
        )
    }//end method

    mounted(){
        console.log('In case ' + this.props.match.params.title);
        caseService.getCaseContent(this.props.match.params.title).then(response => {
            this.title = response[0].overskrift;
            this.pic = response[0].bilde;
            this.highlight = response[0].brodtekst;
            this.text = response[0].innhold;
            this.time = response[0].tidspunkt;
        }).catch((error:Error) => Alert.danger(error.message));
    }//end method
}//end class