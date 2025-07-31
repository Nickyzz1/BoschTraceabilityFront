import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { IMovimentGet, IPart } from '../models/interfaces.model';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NzIconModule, FormsModule, NzInputModule, NzButtonModule, CommonModule,
        NzTableModule, NzBadgeModule
    ],
    templateUrl: './history.component.html',
})
export class HistoryComponent {
  value: string = '';
  moviments: IMovimentGet[] = [];
  filteredMoviments: IMovimentGet[] = [];
  partsMap = new Map<number, IPart>();
  stationsMap = new Map<number, string>();  

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getParts().subscribe(parts => {
      this.partsMap = new Map(parts.map(p => [p.id, p]));
    });

    this.dataService.getStations().subscribe(stations => {
      this.stationsMap = new Map(stations.map(s => [s.id, s.title]));
    });

    this.dataService.getMoviments().subscribe(moviments => {
      this.moviments = moviments;
      this.applyFilter();
    });
  }

  applyFilter() {
    const filterValue = this.value.trim().toLowerCase();

    if (!filterValue) {
      this.filteredMoviments = this.moviments;
      return;
    }

    this.filteredMoviments = this.moviments.filter(mov => {
      const part = this.partsMap.get(mov.partId);
      const partCode = part?.code.toLowerCase() ?? '';
      const originName = (this.stationsMap.get(mov.origin) ?? '').toLowerCase();
      const destinationName = (this.stationsMap.get(mov.destination) ?? '').toLowerCase();

      return partCode.includes(filterValue) || originName.includes(filterValue) || destinationName.includes(filterValue);
    });
  }
}