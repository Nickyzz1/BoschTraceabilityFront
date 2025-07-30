import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { IPart } from '../models/interfaces.model';
import { IStation } from '../models/interfaces.model';
import { IMoviment } from '../models/interfaces.model';
import { NzIconModule } from 'ng-zorro-antd/icon';  

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NzIconModule],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  parts: IPart[] = [];
  stations: IStation[] = [];
  history: IMoviment[] = [];
  qtdParts = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //gets
    this.dataService.getParts().subscribe(parts => {
      this.parts = parts;
      this.qtdParts = parts.length;
    });
    this.dataService.getStations().subscribe(stations => this.stations = stations);
    this.dataService.getMoviments().subscribe(history => this.history = history);

  }

  // funçoes

  getPartsCountForStation(id: number): number {
    return this.parts.filter(p => p.curStationId === id).length;
  }
  getStationName(id: number): string {
  const station = this.stations.find(s => s.id === id);
  return station ? station.title : 'Desconhecido';
  }
}