import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClent: HttpClient) { }


  addTaskDetails(payload: any) {
    return this.httpClent.post(environment.apiUrl + "/services/add", payload)
  }

  updateTaskDetails(id: any, payload: any) {
    return this.httpClent.put(environment.apiUrl + "/services/task/" + id, payload)
  }

  getAllTasks() {
    return this.httpClent.get(environment.apiUrl + "/services/tasks")
  }

  deleteTaskDetails(id: any) {
    return this.httpClent.delete(environment.apiUrl + "/services/task/" + id)
  }
}
