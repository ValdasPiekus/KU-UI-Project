import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HeaderItem } from 'src/app/shared/interfaces/header-items';
import { headerItems } from '../../constants/header-items';
import { Registration } from '../../interfaces/registration';
import { RegistrationService } from '../../services/registration.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { GenderOption } from '../../interfaces/gender-option';
import { genderOptions } from '../../constants/genders';
import { grades } from '../../constants/grades';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.html',
  styleUrls: ['./registration-list.css'],
})
export class RegistrationListComponent {
  headerItems: HeaderItem[] = headerItems;
  registrations: Registration[] = [];
  editIndex: boolean[] = [];
  forms: FormGroup[] = [];
  genderOptions: GenderOption[] = genderOptions;
  grades: number[] = grades;
  currentYear: number = new Date().getFullYear();
  @ViewChild('gradeSelect') gradeSelect!: ElementRef;

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationService.getRegistrations().subscribe(data => {
      this.registrations = data;
      this.forms = data.map(registration => this.initForm(registration));
    });
  }

  initForm(registration: Registration): FormGroup {
    return this.formBuilder.group({
      firstName: [
        registration.firstName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      ],
      lastName: [
        registration.lastName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      ],
      birthYear: [
        registration.birthYear,
        [Validators.required, Validators.pattern(/^\d{4}$/), this.validateBirthYear],
      ],
      gender: [registration.gender, [Validators.required, this.validateGender]],
      email: [registration.email, [Validators.required, Validators.email]],
      phone: [registration.phone, [Validators.required, this.validatePhoneNumber]],
      grade: [registration.grade, [Validators.required, Validators.min(5), Validators.max(12)]],
    });
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

  setIsEdit(index: number, id?: string | null): void {
    if (id != null && id != undefined) {
      const index = this.registrations.findIndex(reg => reg.id === id);
      this.editIndex[index] = true;
    } else {
      this.editIndex[index] = true;
    }
  }

  getGenderLabelByKey(key?: string): string | undefined {
    if (!key) return undefined;

    const genderObject = genderOptions.find(option => option.hasOwnProperty(key));
    return genderObject ? genderObject[key] : undefined;
  }

  saveRegistration(index: number, id?: string | null): void {
    if (this.forms[index].valid && id != null && id != undefined) {
      this.registrationService.updateRegistration(id, this.forms[index].value).then(() => {
        this.editIndex[index] = false;
      });
    }
  }

  deleteRegistration(id?: string | null) {
    if (id != null && id != undefined) {
      this.registrationService.deleteRegistration(id).then(() => {
        this.loadRegistrations();
      });
    }
  }

  cancelEdit(index: number): void {
    this.editIndex[index] = false;
    this.forms[index].reset(this.registrations[index]);
  }
}
