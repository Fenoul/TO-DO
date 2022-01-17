import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoItem } from 'src/app/shared/models/todo-item.model';
import { TodoService } from '../../core/services/todo.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  displayedColumns = ['title', 'status'];
  todoItems: TodoItem[]=[];
  todoItemsDone: TodoItem[]=[];
  response: any;

  constructor(
    private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAll().subscribe( value => {
      this.todoItems = value;
      this.todoItemsDone = [];
      value.forEach((element: { id: any; title: any; desc: any; status: any;}, index) => {
          if(element.status == true){
            let todoDone =this.todoItems.splice(index, 1);
            this.todoItemsDone.push(todoDone[0])
          }
        })
      })
  }

}
