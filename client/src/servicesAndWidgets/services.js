// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
import {News} from "../news";
import {Alert} from "./widgets";

class StudentService {
  getStudents(): Promise<News[]> {
    console.log(axios.get('/students'));
    return axios.get('/students');
  }

  getStudent(id: number): Promise<News> {
    return axios.get('/students/' + id);
  }

  updateStudent(student: News): Promise<void> {
    return axios.put('/students', student);
  }
}
export let studentService = new StudentService();

export class CaseService{
  getCases(): Promise<News[]>{
    console.log(axios.get('/importantCases'));
    return axios.get('/importantCases');
  }//end method

  getAllCases(): Promise<News[]>{ //used to set id for a new case
    return axios.get('/allCases');
  }//end method

  getAllCategories(): Promise<string[]>{
    return axios.get('/allCategories');
  }//end method


  getCaseContent(title: string): Promise<News>{
    console.log(axios.get('/' + title));
    return axios.get('/importantCases/' + title);
  }//end method

  getCategory(category: string): Promise<News[]>{
    console.log(axios.get('/category/' + category));
    return axios.get('/category/' + category);
  }//end method

  addCase(news: News): Promise<void>{
    console.log(axios.post('/addCases'), news);
    return axios.post('/addCases', news);
  }//end method

  editCase(news: News): Promise<void>{
    return axios.put('/editCases',news);
  }//end method

  deleteCase(news: News): Promise<void>{
    console.log('deleting ' + news.id);
    return axios.put('/deleteCases',news);
  }//end method

}//end class