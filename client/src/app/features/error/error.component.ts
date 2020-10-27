import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
