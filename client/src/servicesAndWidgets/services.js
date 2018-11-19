// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
import {News} from "../news";
import {Comments} from "../comments";


export class CaseService{
  getCases(): Promise<News[]>{
    return axios.get('/importantCases');
  }//end method

  getAllCases(): Promise<News[]>{ //used to set id for a new case
    return axios.get('/allCases');
  }//end method

  getAllCategories(): Promise<string[]>{
    return axios.get('/allCategories');
  }//end method


  getCaseContent(title: string): Promise<News>{
    return axios.get('/importantCases/' + title);
  }//end method

  getCategory(category: string): Promise<News[]>{
    return axios.get('/category/' + category);
  }//end method

  addCase(news: News): Promise<void>{
    return axios.post('/addCases', news);
  }//end method

  editCase(news: News): Promise<void>{
    return axios.put('/editCases',news);
  }//end method

  deleteCase(news: News): Promise<void>{
    return axios.put('/deleteCases',news);
  }//end method

  getKey(): Promise<string>{
    return axios.get('/getKey');
  }//end method

  getComments(news:News): Promise<Comments[]>{
    return axios.get('/getComments/' + news.title);
  }//end method

  postComments(news:News,comment:Comments): Promise<void>{
    return axios.post('/postComments/' + news.id, comment);
  }//end method

}//end class