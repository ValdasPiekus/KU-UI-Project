import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.html',
  styleUrls: ['./second-task.css'],
})
export class SecondTaskComponent {
  constructor(private router: Router) {
    this.navigateToDefaultTab();
  }

  navigateToDefaultTab() {
    this.router.navigate(['second-task/task-list']);
  }
}
