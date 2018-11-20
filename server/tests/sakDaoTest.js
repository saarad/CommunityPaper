import * as mysql from "mysql"
import {SakDao} from "../src/sakdao";

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql.stud.iie.ntnu.no",
    user: "iliar",
    password: "EqeQraxo",
    database: "iliar",
    debug: false
});

let sakDao = new SakDao(pool);



afterAll(() => {
   pool.end();
});

test("Get important news with importance set 5 from db", done => {
    function callback(status,data) {
        console.log("Test getImportantNews callback. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.length).toBe(5);
        done();
    }//end method
    sakDao.getImportantNews(callback);
});

test("Get all news from db", done => {
    function callback(status,data) {
        console.log("Test getAllNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.length).toBeGreaterThanOrEqual(8);
        done();
    }//end method
    sakDao.getAllNews(callback);
});

test("Get all categories from db", done => {
    function callback(status,data){
        console.log("Test getAllCategories. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.length).toBe(7);
        done();
    }//end method
    sakDao.getAllCategories(callback);
});

test("Get context for one case from db", done => {
    function callback(status,data){
        console.log("Test getContextForNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data[0].id).toBe(1);
        done();
    }//end method
    sakDao.getContextForNews('Amerikansk fotball kommer tilbake til studentlekene', callback);
});

test("Testing getting all cases under one category", done => {
    function callback(status,data) {
        console.log("Test getCategoryNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }//end method
    sakDao.getCategoryNews('Sport',callback);
});

test("Testing logging in as an admin", done => {
    function callback(status,data) {
        console.log("Test getKey. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data[0].passord).toBeDefined();
        done();
    }//end method
    sakDao.getKey(callback);
});

test("Testing creating a case", done => {
    function callback2(status,data){

    }//end method
    function callback(status,data) {
        console.log("Test createNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }//end method
    sakDao.createNews({title: "Test", highlightedText: "Test",
        time: "19/11/2018 KL: 22.20", context: "Jest tests", pic: "No pic", category:{title: "Annet"},
        importance:{importance: 1}},callback);

    //Deleting case from database
    sakDao.deletePermenantly({title: "Test", highlightedText: "Test",
        time: "19/11/2018 KL: 22.20", context: "Jest tests", pic: "No pic", category:{title: "Annet"},
        importance:{importance: 1}},callback2);
});

test("Testing editing a case", done =>{
    function callback(status,data) {
        console.log("Test editNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }//end method

    sakDao.editNews({title: "Testing creating case and editing case", highlightedText: "Test",
        time: "19/11/2018 KL: 22.20", context: "Jest tests", pic: "No pic", category:{title: "Annet"},
        importance:{importance: 3}, id: 29},callback);
});

test("Testing deleting a case", done => {
    function callback(status,data) {
        console.log("Test deleteNews. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }//end method
    sakDao.deleteNews({title: "Testing creating case and editing case", highlightedText: "Test",
        time: "19/11/2018 KL: 22.20", context: "Jest tests", pic: "No pic", category:{title: "Annet"},
        importance:{importance: 3}, id: 29},callback);
});

test("Testing getting comments under one case", done => {
    function callback(status,data) {
        console.log("Test getComments. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.length).toBeGreaterThanOrEqual(1);
        done();
    }//end method
    sakDao.getComments('Amerikansk fotball kommer tilbake til studentlekene',callback);
});

test("Testing posting a comment under one case", done => {
    function callback(status,data) {
        console.log("Test postComments. Status: " + status + " Data: " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }//end method
    sakDao.postComments(29,{name: "JEST", comment: "Testing to post comment"},callback);
});