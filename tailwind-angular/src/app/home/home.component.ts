import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NzIconModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {}