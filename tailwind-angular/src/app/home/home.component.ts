import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NzIconModule,FormsModule, NzInputModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {}