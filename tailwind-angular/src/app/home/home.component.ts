import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { IPart } from '../models/interfaces.model';
import { IStation } from '../models/interfaces.model';
import { IMovimentGet } from '../models/interfaces.model';
import { NzIconModule } from 'ng-zorro-antd/icon';  
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NzIconModule,RouterModule],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  parts: IPart[] = [];
  stations: IStation[] = [];
  history: IMovimentGet[] = [];
  qtdParts = 0;
  qtdMov = 0;
  qtdFinalizadas = 0;
  qtdProcesso = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //gets
    this.dataService.getParts().subscribe(parts => {
      this.parts = parts;
      this.qtdParts = parts.length;
      this.qtdFinalizadas = this.parts.filter(p => p.status.toLowerCase() === "finalizada").length;
      this.qtdProcesso = this.parts.filter(p => p.status.toLowerCase() === "em processamento").length;
    });

    this.dataService.getStations().subscribe(stations => this.stations = stations);
    this.dataService.getMoviments().subscribe(history => {
      this.history = history;
      this.qtdMov = this.history.length;
    });
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
