import { Component, OnInit, signal } from '@angular/core';
import { DataService } from './services/data.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms'; // para ngModel


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent,
    FormsModule,
    NzModalModule,
    NzInputModule,
    NzBadgeModule,
    NzIconModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.loadAll();
  }
}
