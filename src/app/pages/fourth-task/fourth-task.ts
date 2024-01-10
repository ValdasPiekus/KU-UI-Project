import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fourth-task',
  templateUrl: './fourth-task.html',
  styleUrls: ['./fourth-task.css'],
})
export class FourthTaskComponent {
  constructor(private router: Router) {
    this.navigateToDefaultTab();
  }

  navigateToDefaultTab() {
    this.router.navigate(['fourth-task/registration-list']);
  }
}
