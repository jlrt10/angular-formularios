import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-formularios-final';
  form: FormGroup;
  save = false;
  countries = [
    {
      id: 1,
      name: 'Colombia'
    },
    {
      id: 2,
      name: 'México'
    },
    {
      id: 3,
      name: 'Peru'
    }
  ];
  questions = [
    '¿Tienes mascota?',
    '¿Cual es tu país de nacimiento?',
    '¿Cómo se llama tu madre?'
  ];
  submitData = {
    name: '',
    date: '',
    number: '',
    email: '',
    country: '',
    password: '',
    recoveryData: []
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recoveryData: this.formBuilder.array([])
    });
  }

  get getName() {
    return this.form.get('name');
  }

  get getDate() {
    return this.form.get('date');
  }

  get getNumber() {
    return this.form.get('number');
  }

  get getEmail() {
    return this.form.get('email');
  }

  get getCountry() {
    return this.form.get('country');
  }

  get getPassword() {
    return this.form.get('password');
  }

  get getRecoveryData(): FormArray {
    return this.form.get('recoveryData') as FormArray;
  }

  ngOnInit(): void {

  }

  recoveryData(): void {
    this.getRecoveryData.push(this.newFormGroup());
  }

  newFormGroup(): FormGroup {
    return this.formBuilder.group({
      question: [],
      answer: []
    });
  }

  removeRow(index: number): void {
    this.getRecoveryData.removeAt(index);
  }

  resetData(): void {
    this.getRecoveryData.clear();
    this.form.reset();
  }

  saveData(): void {
    this.save = true;
    this.submitData.name = this.getName?.value;
    this.submitData.date = this.getDate?.value;
    this.submitData.number = this.getNumber?.value;
    this.submitData.email = this.getEmail?.value;
    this.submitData.country = this.getCountry?.value;
    this.resetData();
  }
}
