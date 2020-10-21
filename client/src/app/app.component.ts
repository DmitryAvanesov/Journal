import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Journal';
}
