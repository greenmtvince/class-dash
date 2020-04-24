import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student, StudentService } from '../student.service';
import 'rxjs/Rx';
import { error } from 'protractor';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  errors: string = '';
  isLoading: boolean = false;
  newStudent: Student;

  constructor(private studentService: StudentService) { }
  @Output()
  studentAdded: EventEmitter<Student> = new EventEmitter<Student>();

  ngOnInit(): void {
    this.newStudent = {
      id:9999, 
      last_name:"",
      first_name:"",
      birthdate: new Date(), 
      photo_url:"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", 
      isUpdating:false, 
      enableEdit:false
    };
  }

  addStudent(){
    this.isLoading = true;
    this.studentService
      .createStudent(this.newStudent)
      .subscribe(
        response => {
          var student = response.json();
          this.isLoading = false;
          student.isUpdating = false;
          this.studentAdded.emit(student)
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }

}
