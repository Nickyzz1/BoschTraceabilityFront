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

  newPartCode: string = '';
  partCode: string = '';
  parts: IPart[] = [];
  stations: IStation[] = [];
  selected: string = 'pecas';
  value: number | null = null;
  stationTitle: string | null = null;
  stationOrder: number | null = null;
  stationNewTitle = '';
  stationNewOrder: number | null = null;
  selectedStation: IStation | null = null;

  selectedPart: any = null;
  editModalVisible = false;
  deleteModalVisible = false;
  visible: boolean = false;
  loading = false;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getParts().subscribe(parts => { this.parts = parts });
    this.dataService.getStations().subscribe(stations => this.stations = stations);
  }

  select(value: string) {
    this.selected = value;
  }

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

  openEditModalStation(station: IStation) {
    this.selectedStation = station;
    this.stationNewTitle = station.title;
    this.stationNewOrder = station.sort;
    this.editModalVisible = true;
  }

  saveStation() {
    if (!this.selectedStation) return;
    if (!this.stationNewTitle || this.stationNewOrder === null) {
      alert('Preencha todos os campos!');
      return;
    }
    this.loading = true;
    this.dataService.updateStation(this.selectedStation.id, {
      title: this.stationNewTitle,
      sort: this.stationNewOrder
    }).subscribe({
      next: () => {
        alert('Estação atualizada com sucesso!');
        this.editModalVisible = false;
        this.loading = false;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err: any) => {
        alert('Erro ao atualizar estação: ' + err.message);
        this.loading = false;
      }
    });
  }

  openDeleteModalStation(station: IStation) {
    this.selectedStation = station;
    this.deleteModalVisible = true;
  }

  confirmDeleteStation() {
    if (!this.selectedStation) return;
    this.loading = true;
    this.dataService.deleteStation(this.selectedStation.id).subscribe({
      next: () => {
        alert('Estação excluída!');
        this.deleteModalVisible = false;
        this.loading = false;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err: any) => {
        alert('Erro ao excluir estação: ' + err.message);
        this.loading = false;
      }
    });
  }

  cadastrarPart() {
    if (!this.newPartCode) {
      alert('Digite o código da peça!');
      return;
    }
    this.dataService.addPart({
      Code: this.newPartCode,
      Status: "Em processamento",
      CurStationId: 1
    }).subscribe({
      next: (part) => {
        alert(`Peça ${part.code} criada com sucesso!`);
        this.dataService.getParts().subscribe(parts => this.parts = parts);
        this.newPartCode = '';
      },
      error: (err) => alert('Erro ao criar peça: ' + err.message)
    });
  }

  cadastrarEstacao() {
    if (!this.stationTitle || !this.stationOrder) {
      alert('Preencha nome e ordem da estação!');
      return;
    }
    this.dataService.addStation({
      title: this.stationTitle,
      sort: Number(this.stationOrder),
    }).subscribe({
      next: (station) => {
        alert(`Estação ${station.title} cadastrada!`);
        this.stationTitle = '';
        this.stationOrder = null;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err) => alert('Erro ao cadastrar estação: ' + err.message)
    });
  }

  save() {
    if (!this.selectedPart) return;
    this.loading = true;
    this.dataService.updatePartCode(this.selectedPart.id, this.partCode).subscribe({
      next: updatedPart => {
        alert(`Peça atualizada para ${updatedPart.code}`);
        this.editModalVisible = false;
        this.loading = false;
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
