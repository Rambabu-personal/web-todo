import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  tasks: any;
  update: boolean = false;
  taskId: any;
  disable=true

  constructor(private fb: FormBuilder, private service: AppService) {
    this.taskForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      completionStatus: ['']
    });
  }
  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.service.getAllTasks().subscribe(
      (successResp: any) => {
        this.tasks = successResp;
      }
    )
  }

  onSubmit() {
    if(this.update === true) {
      this.service.updateTaskDetails(this.taskId, this.taskForm.value).subscribe(
        (successResp: any) => {
          console.log(successResp);
          this.getAllTasks();   
          this.update = false;
          this.taskForm.reset();     
        }
      )
    } else {
      this.service.addTaskDetails(this.taskForm.value).subscribe(
        (successResp: any) => {
          console.log(successResp);   
          this.getAllTasks(); 
          this.update = false;
          this.taskForm.reset();     
        }
      )
    }
  }

  editData(data: any) {
    this.update = true;
    this.taskId = data.id;
    this.taskForm.patchValue({
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? moment(data.dueDate).format('YYYY-MM-DD')  : '',
      completionStatus: data.completionStatus
    })
  }

  deleteTask(task: any) {
    this.service.deleteTaskDetails(task.id).subscribe(
      (success: any) => {
        console.log(success);        
        this.getAllTasks();
      }
    )
  }

}
