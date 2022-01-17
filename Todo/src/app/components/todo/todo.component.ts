import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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

  showOptions(event:MatCheckboxChange, element:TodoItem): void {
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
