import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})

export class PersonFormComponent {
  @Input() personForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get skills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
