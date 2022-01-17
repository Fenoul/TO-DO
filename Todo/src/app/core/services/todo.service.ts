import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TodoItem } from 'src/app/shared/models/todo-item.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = "http://localhost:57000/api/";
  
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) { }

    getAll(): Observable<TodoItem[]> {
      return this.http
        .get<TodoItem[]>(this.apiUrl + "TodoItem")
        .pipe(
          tap(data => console.log(data)),
          catchError(this.handleError)
        );
  }
  
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}