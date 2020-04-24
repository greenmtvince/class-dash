import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})


export class StudentListComponent implements OnInit {

    students: Student[] ;
    errorMsg: string;
    isLoading: boolean = true;  
    isAddNew: boolean = false;  

    constructor( private studentService: StudentService) { }
  
    ngOnInit(): void {
      this.getStudents();
    }
  
    getStudents() {
      this.studentService.getStudents().subscribe(
        students => { 
          this.students = students,
          this.isLoading = false;
        },
        error => this.errorMsg = <any>error
      );
    }
    
    findStudent(id): Student {
      return this.students.find(student => student.id === id);
    }

    isUpdating(id): boolean {
      return this.findStudent(id).isUpdating;
    }

    editStudent(student: Student): Student{
        student.isUpdating=true;
        this.studentService
          .editStudent(student)
          .subscribe(response => {
            student.enableEdit = false;
          },
          error => {this.errorMsg = <any>error;
          student.isUpdating =false;
          }
        );
      student.enableEdit = false;
      return student;
    }

    appendStudent(student: Student) {
      this.students.push(student);
      this.isAddNew = false;
    }

  }