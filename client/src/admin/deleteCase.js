// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path
import {CaseService} from "../servicesAndWidgets/services";
import {News} from "../news";
import {Category} from "../category";
import {Importance} from "../importance";

let caseService = new CaseService();
let chosenNews: News;

export class DeleteCase extends Component{
    cases: News[] = [];
    chosenCase: string = '';
    render(){
        return(
            <div className="bg-dark text-center">
                <h1 style={{color: 'white'}}> Velg saken du vil slette</h1>
                <select className="btn btn-secondary" onChange={this.setCase}>
                    <option value="" className="btn btn-secondary">Velg sak</option>
                    {
                        this.cases.map(e => {
                            return <option key={e.title} value={e.title} className="btn btn-secondary">{e.title}</option>
                        })
                    }
                </select>
                <br/>
                <br/>
                <br/>
                <button className="btn btn-primary" onClick={this.delete}> Slett saken</button>
            </div>
        )
    }//end method

    mounted(){
        caseService.getAllCases().then(response => {
            response.map(e => {
                let allNews = new News(e.overskrift,e.brodtekst,e.tidspunkt,e.bilde,e.innhold,new Category(e.kategori),new Importance(e.viktighet));
                allNews.setId(e.id);
                console.log(allNews);
                this.cases.push(allNews);
            });
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    setCase(event: Event){
        this.chosenCase = event.target.value;
        console.log(this.chosenCase);
    }//end method

    delete(){
        chosenNews = this.cases.find(e => e.title === this.chosenCase);
        console.log(chosenNews.id);
        if(chosenNews !== undefined) {
            if(confirm('Vil du slette sak med tittlen ' + chosenNews.title)){
                caseService.deleteCase(chosenNews).then(this.caseDeleted()).catch((error:Error) => Alert.danger(error.message));
            } else{
                history.push('/velgSakSlett');
            }
        }
        else Alert.danger('Du må velge saken du vil slette!');
    }//end method

    caseDeleted(){
        Alert.success('Case with title ' + chosenNews.title + ' is deleted');
        history.push('/');
    }//end method

}//end class