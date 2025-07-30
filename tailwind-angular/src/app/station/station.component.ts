import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { DataService } from '../services/data.service';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { IPart, IStation } from '../models/interfaces.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent,
    NzIconModule, NzButtonModule, FormsModule,
    NzInputModule, NzTableModule, NzBadgeModule,
    NzModalModule],
  templateUrl: './station.component.html',
})
export class StationComponent {

  //variaáveis
  newPartCode: string = '';
  partCode: string = '';
  parts: IPart[] = [];
  stations: IStation[] = [];
  selected: string = 'pecas';
  value: number | null = null;
  valueLocal: string = '';
  select(value: string) {
    this.selected = value;
  }

  // controladores de estado

  selectedPart: any = null;
  editModalVisible = false;
  deleteModalVisible = false;
  visible: boolean = false;
  loading = false;

  openEditModal(part: IPart) {
    this.selectedPart = part;
    this.partCode = part.code;
    this.editModalVisible = true;
  }

  openDeleteModal(part: IPart) {
    this.selectedPart = part;
    this.partCode = part.code;
    this.deleteModalVisible = true;
  }

  // requisições
  constructor(public dataService: DataService) { }

  //gets
  ngOnInit() {
    this.dataService.getParts().subscribe(parts => { this.parts = parts });
    this.dataService.getStations().subscribe(stations => this.stations = stations);
  }
  //post
  cadastrarPart() {
    if (!this.newPartCode) {
      alert('Digite o código da peça!');
      return;
    }
    console.log({
      Code: this.newPartCode,
      Status: "Em processamento",
      CurStationId: 1
    });

    this.dataService.addPart({
      Code: this.newPartCode,
      Status: "Em processamento",
      CurStationId: 1
    }).subscribe({
      next: (part) => {
        alert(`Peça ${part.code} criada com sucesso!`);
        this.dataService.getParts().subscribe();
        this.newPartCode = '';
      },
      error: (err) => alert('Erro ao criar peça: ' + err.message)
    });
  }

  //put

  save() {
    if (!this.selectedPart) return;

    this.loading = true;
    this.dataService.updatePartCode(this.selectedPart.id, this.partCode).subscribe({
      next: updatedPart => {
        alert(`Peça atualizada para ${updatedPart.code}`);
        this.editModalVisible = false;
        this.loading = false;
        // atualiza lista, por ex:
        this.dataService.getParts().subscribe(parts => this.parts = parts);
      },
      error: err => {
        alert('Erro ao atualizar peça: ' + err.message);
        this.loading = false;
      }
    });
  }

  confirm() {
    if (!this.selectedPart) return;

    this.loading = true;
    this.dataService.deletePart(this.selectedPart.id).subscribe({
      next: () => {
        alert('Peça excluída com sucesso!');
        this.deleteModalVisible = false;
        this.loading = false;
        this.selectedPart = null;
        // atualiza lista:
        this.dataService.getParts().subscribe(parts => this.parts = parts);
      },
      error: err => {
        alert('Erro ao excluir peça: ' + err.message);
        this.loading = false;
      }
    });
  }

  getStationName(id: number): string {
    const station = this.stations.find(s => s.id === id);
    return station ? station.title : 'Desconhecido';
  }
}