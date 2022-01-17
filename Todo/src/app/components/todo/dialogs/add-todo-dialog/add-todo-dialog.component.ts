import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    status: new FormControl(false)
  });
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,private formBuilder: FormBuilder, private readonly todoService: TodoService,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        desc: [],
      },
    ); 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.todoService.create(this.form.value).subscribe(value => {})

    this.form.reset();
    this.dialogRef.close();
  }
  
  onReset(): void {
    this.dialogRef.close();
  } 
}
