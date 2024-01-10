import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { HeaderItem } from 'src/app/shared/interfaces/header-items';
import { headerItems } from '../../constants/header-items';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { genderOptions } from '../../constants/genders';
import { GenderOption } from '../../interfaces/gender-option';
import { grades } from '../../constants/grades';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { infoMessages } from '../../constants/info-messages';
import { InfoMessages } from 'src/app/shared/interfaces/info-messages';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.html',
  styleUrls: ['./new-registration.css'],
})
export class NewRegistrationComponent {
  headerItems: HeaderItem[] = headerItems;
  form: FormGroup;
  genderOptions: GenderOption[] = genderOptions;
  grades: number[] = grades;
  currentYear: number = new Date().getFullYear();
  @ViewChild('gradeSelect') gradeSelect!: ElementRef;
  infoMessage?: string;
  infoMessages: InfoMessages = infoMessages;

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private database: AngularFireDatabase
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      birthYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/), this.validateBirthYear]],
      gender: ['', [Validators.required, this.validateGender]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.validatePhoneNumber]],
      grade: ['', [Validators.required, Validators.min(5), Validators.max(12)]],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => (this.infoMessage = ''));
  }

  validateBirthYear(control: AbstractControl): ValidationErrors | null {
    const currentYear = new Date().getFullYear();
    const value = Number(control.value);
    return value && value <= currentYear - 5 ? null : { invalidBirthYear: true };
  }

  validateGender(control: AbstractControl): ValidationErrors | null {
    const validGenderValues = genderOptions.flatMap(option => Object.keys(option));
    return validGenderValues.includes(control.value) ? null : { invalidGender: true };
  }

  validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
    const phoneNumberPattern = /^\+370\d{8}$/;
    return phoneNumberPattern.test(control.value) ? null : { invalidPhoneNumber: true };
  }

  getGenderKey(option: GenderOption): string {
    return Object.keys(option)[0];
  }

  getGenderValue(option: GenderOption): string {
    return option[Object.keys(option)[0]];
  }

  onGradeChange(event: any): void {
    const selectElement = event.target;
    if (selectElement.value === '') {
      this.renderer.addClass(this.gradeSelect.nativeElement, 'default-selection');
    } else {
      this.renderer.removeClass(this.gradeSelect.nativeElement, 'default-selection');
    }
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid) {
      this.registrationService.createRegistration(formData);
      this.form.reset({
        grade: '',
      });
      this.renderer.addClass(this.gradeSelect.nativeElement, 'default-selection');
      this.infoMessage = 'success';
    }
  }
}
