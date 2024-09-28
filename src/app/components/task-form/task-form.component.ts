import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      persons: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson(): void {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([])
    });
    this.persons.push(personForm);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        completed: false
      };
      this.taskService.addTask(task);
      this.taskForm.reset();
    }
  }
}