// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
import {News} from "../news";

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

  getCaseContent(title: string): Promise<News>{
    console.log(axios.get('/' + title));
    return axios.get('/importantCases/' + title);
  }//end method

  getCategory(category: string): Promise<News[]>{
    console.log(axios.get('/category/' + category));
    return axios.get('/category/' + category);
  }//end method

}//end class