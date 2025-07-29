import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NzIconModule, NzButtonModule, FormsModule,  NzInputModule,NzTableModule, NzBadgeModule],
  templateUrl: './station.component.html',
})
export class StationComponent {
  
  selected: string = 'pecas';
  value: number | null = null;
  valueLocal: string = '';
  select(value: string) {
    this.selected = value;
  }

  data = [
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  {
    codigo: '001',
    dataCriacao: '28/07/2025, 19:41',
    estacaoAtual: 'Recebimento',
    status: 'Em Processamento',
  },
  ];

  dataStation = [
  {
    title: 'Estação inicial',
    dataCriacao: '28/07/2025, 19:41',
    quantidade:30,

  },
  {
    title: 'Estação inicial',
    dataCriacao: '28/07/2025, 19:41',
    quantidade:30,

  },
  {
    title: 'Estação inicial',
    dataCriacao: '28/07/2025, 19:41',
    quantidade:30,

  },
];
}