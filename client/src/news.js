// @flow

import {Category} from './user/category.js';
import {Importance} from './importance.js';



export class News{
    id: number = 8;
    title: string;
    highlightedText: string;
    time: string;
    pic: string;
    context: string;
    category: Category;
    importance: Importance;


    constructor(title: string, highlightedText:string, time: string, pic: string, context: string,
                category: Category,importance: Importance){
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
