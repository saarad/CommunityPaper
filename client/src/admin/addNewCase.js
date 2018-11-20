// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import {News} from "../news";
import {Category} from "../user/category";
import {Importance} from "../importance";
export let news: News;
let date = new Date();

import createHashHistory from 'history/createHashHistory';
import {CaseService} from "../servicesAndWidgets/services";
const history = createHashHistory(); // Use history.push(...) to programmatically change path

let caseService = new CaseService();


export class AddNewCase extends Component{
    title: string = '';
    pic: string = '';
    highlightedText: string = '';
    time: string = '';
    text: string = '';
    category: string = '';
    categories: string[] = [];
    importances: number[] = [1,2,3,4,5];
    chosenImportance: number = 0; //value is not allowed in database
    render(){
        return(
            <div className="bg-dark">
                <h1 className="card-title text-center" style={{color: 'white'}}>Legg til din sak</h1>
                <br/>

                <form className="card container bg-dark border-0">
                    <ul className="input-group list-inline">
                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Overskrift {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
                        type="text"
                        value={this.title}
                        onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.title = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> BrødTekst {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
                               type="text"
                               value={this.highlightedText}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.highlightedText = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 className="float-left" style={{color: 'white'}}> Bildeadresse (fra nettet) {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
                               type="text"
                               value={this.pic}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.pic = event.target.value)}/>


                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Innhold {' '} </h3>
                        </li>
                         <textarea
                        className=" my-sm-3 form-control"
                        id="content"
                        value={this.text}
                        onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.text = event.target.value)}
                        rows="4"> </textarea>

                    </ul>
                    <div>
                        <h3 style={{color: 'white'}}>Velg kategori </h3>
                        <select className="btn btn-secondary" onChange={this.setCategory}>
                            <option value="" className="btn btn-secondary">
                                Velg kategori
                            </option>
                            {
                                this.categories.map(e => {
                                 return <option key={e} value={e} className="btn btn-secondary">
                                          {e}
                                  </option>
                                })
                            }
                        </select>

                        <h3 style={{color: 'white'}}>Velg viktighet </h3>
                        <select className="btn btn-secondary" onChange={this.setImportance}>
                            <option value={0} className="btn btn-secondary">
                                Velg viktighet
                            </option>
                            {
                                this.importances.map(e =>{
                                    return <option key={e} value={e} className="btn btn-secondary">
                                            {e}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="text-center btn-group-lg">
                        <button type="button" className="btn btn-danger" onClick={this.save}>
                            Legg til sak
                        </button>
                    </div>
                </form>
            </div>
        )
    }//end method

    mounted(){
        caseService.getAllCategories().then(response => {
            response.map(e => this.categories.push(e.navn));
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    save(){
        this.time = date.getDate() + '/' + (date.getUTCMonth()+1) + '/' +
            date.getFullYear() + ' KL: ' + date.getHours() + ':' + date.getMinutes();
        console.log(this.time);
        if(this.title !== '' && this.pic !== '' && this.highlightedText !== '' &&
        this.text !== '' && this.category !== '' && this.chosenImportance !== 0){
            console.log(this.category);
            news = new News(this.title,this.highlightedText,this.time,this.pic,this.text,new Category(this.category),new Importance(this.chosenImportance));
            history.push('/bekreft');
        }else{
            Alert.danger('Fyll ut hele formen før du fortsetter');
        }//end condition
    }//end method

    setCategory(event:Event){
        this.category = event.target.value;
    }//end method

    setImportance(event: Event){
        this.chosenImportance = event.target.value;
    }//end method
}//end class

