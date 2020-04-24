import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

export interface Student {
  id: Number,
  first_name: String,
  last_name: String,
  birthdate: Date,
  photo_url: String,
  isUpdating: boolean,
  enableEdit: boolean
}

const API_URL: string = 'http://localhost:8013';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private headers;

  constructor(private http: Http) { 
    this.init();
  }

  async init() {
    this.headers = new Headers({

    });
  }

  getStudents(): Observable<Student[]> {
    return this.http.get(API_URL + '/students', new RequestOptions({ headers: this.headers }))
    .pipe(map(res => {
      let modifiedResult = res.json();
      console.log(modifiedResult);
      modifiedResult = modifiedResult.map(function(student) {
        student.isUpdating = false;
        student.enableEdit = false;
        return student;
      });
      return modifiedResult;
    }));
  }

  editStudent(student){
    let body = JSON.stringify(student);
    return this.http.post(API_URL + '/students/' + student.id, body, new RequestOptions({}) ); 
  }

  createStudent(student) {
    let body = JSON.stringify(student);
    return this.http.post(API_URL + '/students/', body, new RequestOptions({}) ); 
  }
}
