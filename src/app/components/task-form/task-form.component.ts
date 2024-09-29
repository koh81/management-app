import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
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
      dueDate: ['', [Validators.required, this.futureDateValidator]],
      persons: this.fb.array([], [Validators.required, Validators.minLength(1), this.noDuplicateFullNames()])
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
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)])
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
      this.taskService.addTask(task).subscribe({
        next: () => {
          this.taskForm.reset();
          this.persons.clear();
        },
        error: (error) => console.error('Error agregando tarea:', error)
      });
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { futureDate: true };
    }
    return null;
  }  

  noDuplicateFullNames(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (formArray instanceof FormArray) {
        const fullNames = formArray.controls.map(control => 
          control.get('fullName')?.value.toLowerCase()
        );
        const hasDuplicates = new Set(fullNames).size !== fullNames.length;
        return hasDuplicates ? { duplicateFullName: true } : null;
      }
      return null;
    };
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}