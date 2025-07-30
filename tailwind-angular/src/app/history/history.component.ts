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

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NzIconModule, FormsModule, NzInputModule, NzButtonModule, CommonModule,
        NzTableModule, NzBadgeModule
    ],
    templateUrl: './history.component.html',
})
export class HistoryComponent {
  moviments: IMovimentGet[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMoviments().subscribe(moviments => {
      this.moviments = moviments;

      // para cada movimentação, buscar o código da peça
      this.moviments.forEach(mov => {
        this.dataService.getPartById(mov.partId).subscribe(part => {
          mov.partCode = part.code; // adiciona dinamicamente
        });
      });
    });
  }

  value: number | null = null;
}
