// @flow

import {Category} from './category.js';
import {Importance} from './importance.js';



export class News{
    id: number;
    title: string;
    highlightedText: string;
    time: string;
    pic: string;
    context: string;
    category: Category;
    importance: Importance;
    static nextID: number = 7;

    constructor(title: string, highlightedText:string, time: string, pic: string, context: string,
                category: Category,importance: Importance){
        this.id = News.nextID++;
        this.title = title;
        this.highlightedText = highlightedText;
        this.time = time;
        this.pic = pic;
        this.context = context;
        this.category = category;
        this.importance = importance;
    }//end constructor

    setId(id: number){
        this.id = id;
    }//end method


} //end class
