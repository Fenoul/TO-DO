import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from 'src/app/shared/models/todo-item.model';
import { TodoService } from '../../core/services/todo.service'
import { AddTodoDialogComponent } from './dialogs/add-todo-dialog/add-todo-dialog.component';
import { ViewTodoDialogComponent } from './dialogs/view-todo-dialog/view-todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  displayedColumns = ['title', 'status', 'info'];
  todoItems: TodoItem[]=[];
  todoItemsDone: TodoItem[]=[];
  response: any;

  constructor(
    private readonly todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(value => {
      let todoItemsArray: TodoItem[]=[]
      let todoItemsDoneArray: TodoItem[]=[]

      this.todoItemsDone = value;
      value.forEach((element: { id: any; title: any; desc: any; status: any;}, index) => {
          if(element.status === true){
            todoItemsArray.push(element)
          } else{
            todoItemsDoneArray.push(element)
          }
        })
        this.todoItemsDone = todoItemsArray;
        this.todoItems = todoItemsDoneArray.reverse();
      })
  }

  openAddTodo(): void {
    let dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.todoService.getAll().subscribe(value => {
        let todoItemsArray: TodoItem[]=[]
        let todoItemsDoneArray: TodoItem[]=[]
  
        this.todoItemsDone = value;
        value.forEach((element: { id: any; title: any; desc: any; status: any;}, index) => {
            if(element.status === true){
              todoItemsDoneArray.unshift(element)
            } else{
              todoItemsArray.push(element)
            }
          })
          this.todoItemsDone = todoItemsDoneArray;
          this.todoItems = todoItemsArray.reverse();
        })
    });
  }

  openViewTodo(element: TodoItem): void {
    let dialogRef = this.dialog.open(ViewTodoDialogComponent, {
      width: '50%',
      data: element
    });
  }

  changeStatus(event:MatCheckboxChange, element:TodoItem): void {
    if(event.checked == true){
      const searchIndex = this.todoItems.findIndex((todo) => todo.id == element.id);
      let todoDone =this.todoItems.splice(searchIndex, 1);
      this.todoItems = [...this.todoItems];
      this.todoItemsDone = [...this.todoItemsDone, todoDone[0]];
    } else {
      const searchIndex = this.todoItemsDone.findIndex((todo) => todo.id == element.id);
      let todoDone =this.todoItemsDone.splice(searchIndex, 1);
      this.todoItemsDone = [...this.todoItemsDone];
      this.todoItems = [...this.todoItems, todoDone[0]];
    }
    element.status = !element.status
    this.todoService.patch(element).subscribe( value => {})
  }
}
