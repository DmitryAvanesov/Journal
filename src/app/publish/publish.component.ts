import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  formGroup: FormGroup;

  submitPublishForm(): void {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      numberControl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      yearControl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
      coverControl: new FormControl(''),
    });

    this.iconRegistry.addSvgIcon(
      'attach',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/attach.svg')
    );
  }
}
