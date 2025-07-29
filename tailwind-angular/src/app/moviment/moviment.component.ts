import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NzIconModule,FormsModule, NzInputModule, CommonModule,NzButtonModule, FormsModule, NzBadgeModule],
  templateUrl: './moviment.component.html',
})
export class MovimentComponent {
  value: number | null = null;
}
