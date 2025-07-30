import { Component, OnInit, signal } from '@angular/core';
import { DataService } from './services/data.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.loadAll();
  }
}
