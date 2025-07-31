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
import { NzNotificationService } from 'ng-zorro-antd/notification';
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

  // variáveis
  newPartCode: string = '';
  partCode: string = '';
  stationNewTitle = '';
  selected: string = 'pecas';
  value: string | null = null;
  stationTitle: string | null = null;
  stationOrder: number | null = null;
  stationNewOrder: number | null = null;
  selectedPart: IPart | null = null;
  editModalVisible = false;
  deleteModalVisible = false;
  visible: boolean = false;
  loading = false;
  selectedStation: IStation | null = null;
  parts: IPart[] = [];
  stations: IStation[] = [];
  
  constructor(public dataService: DataService, private notification: NzNotificationService) { }

  // injetando valoress em sations e parts
  ngOnInit() {
    this.dataService.getParts().subscribe(parts => { this.parts = parts });
    this.dataService.getStations().subscribe(stations => this.stations = stations);
  }
  // escolhendo qual aba ver
  select(value: string) {
    this.selected = value;
  }

  getStationName(id: number): string {
    const station = this.stations.find(s => s.id === id);
    return station ? station.title : 'Desconhecido';
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

  openDeleteModalStation(station: IStation) {
    this.selectedStation = station;
    this.deleteModalVisible = true;
  }

  get filteredParts() {
    if (!this.value || this.value.trim() === '') return this.parts;

    const filterValue = this.value.trim().toLowerCase();

    return this.parts.filter(part =>
      part.code.toString().toLowerCase().includes(filterValue)
    );
  }
  
  // registrar
  registerPart() {
    if (!this.newPartCode) {
      this.notification.error(
        'Digite o código da peça!',
        '',
        {
          nzStyle: {
            backgroundColor: '#AF0848FF',
          },
          nzClass: 'custom-notification'
        },
      );
      return;
    }

    this.dataService.addPart({
      Code: this.newPartCode,
      Status: "Em processamento",
      CurStationId: 1
    }).subscribe({
      next: (part) => {
        this.notification.success(
          'Sucesso',
          `Peça ${part.code} criada com sucesso!`,
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',  // verde forte
            },
            nzClass: 'custom-notification'
          }
        );
        this.dataService.getParts().subscribe(parts => this.parts = parts);
        this.newPartCode = '';
      },
      error: (err) => {
        this.notification.error(
          'Peça já cadastrada',
          '',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
        return;
      }
    });
  }

  registerStation() {
    if (!this.stationTitle || !this.stationOrder) {
      this.notification.error(
        'Preencha o nome e ordem da estação',
        '',
        {
          nzStyle: {
            backgroundColor: '#AF0848FF',
          },
          nzClass: 'custom-notification'
        },
      );
      return;
    }
    this.dataService.addStation({
      title: this.stationTitle,
      sort: Number(this.stationOrder),
    }).subscribe({
      next: (station) => {
        this.notification.success(
          'Sucesso',
          'Estação cadastrada',
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',
            },
            nzClass: 'custom-notification'
          }
        );
        this.stationTitle = '';
        this.stationOrder = null;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err) => {
        this.notification.error(
          'Nome de estação ou ordem já cadastrada!',
          '',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
        return;
      }
    });
  }
  
  //updates
  updatePart() {
    if (!this.selectedPart) return;
    this.loading = true;
    this.dataService.updatePartCode(this.selectedPart.id, this.partCode).subscribe({
      next: updatedPart => {
        this.notification.success(
          'Sucesso',
          `Peça atualizada para ${updatedPart.code}`,
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',
            },
            nzClass: 'custom-notification'
          }
        );
        this.editModalVisible = false;
        this.loading = false;
        this.dataService.getParts().subscribe(parts => this.parts = parts);
      },
      error: err => {
        this.notification.error(
          'Erro ao atualizar Peça',
          'Ocorreu um erro desconhecido',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
        this.loading = false;
      }
    });
  }
  
  updateStation() {
    if (!this.selectedStation) return;
    if (!this.stationNewTitle || this.stationNewOrder === null) {
      this.notification.error(
        'Digite todos os campos!',
        '',
        {
          nzStyle: {
            backgroundColor: '#AF0848FF',
          },
          nzClass: 'custom-notification'
        },
      );
      return;
    }
    this.loading = true;
    console.log(this.selectedStation.id)
    this.dataService.updateStation(this.selectedStation.id, {
      title: this.stationNewTitle,
      sort: this.stationNewOrder
    }).subscribe({
      next: () => {
        this.notification.success(
          'Sucesso',
          'Estação atualizada comm sucesso',
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',
            },
            nzClass: 'custom-notification'
          }
        );
        this.editModalVisible = false;
        this.loading = false;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err: any) => {
        this.notification.error(
          'Duas estaçõess não podem etr a mesma ordem de processo!',
          '',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
        this.loading = false;
      }
    });
  }

  // deletes

  deleteStation() {
    if (!this.selectedStation) return;
    this.loading = true;
    this.dataService.deleteStation(this.selectedStation.id).subscribe({
      next: () => {
       this.notification.success(
          'Sucesso',
          'Estação ecluida com sucesso',
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',
            },
            nzClass: 'custom-notification'
          }
        );
        this.deleteModalVisible = false;
        this.loading = false;
        this.dataService.getStations().subscribe(stations => this.stations = stations);
      },
      error: (err: any) => {
        this.notification.error(
          'Erro ao excluir estação!',
          'Tente novamente mais tarde',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
        this.loading = false;
      }
    });
  }
  deletePart() {
    if (!this.selectedPart) return;
    this.loading = true;
    this.dataService.deletePart(this.selectedPart.id).subscribe({
      next: () => {
        this.notification.success(
          'Sucesso',
          'Peça excluída!',
          {
            nzStyle: {
              backgroundColor: '#1DAF3FFF',
            },
            nzClass: 'custom-notification'
          }
        );
        this.deleteModalVisible = false;
        this.loading = false;
        this.selectedPart = null;
        this.dataService.getParts().subscribe(parts => this.parts = parts);
      },
      error: err => {
        this.notification.error(
          'Erro ao excluir Peça',
          err.message || 'Ocorreu um erro desconhecido',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-success-notification'
          },
        );
        this.loading = false;
      }
    });
  }
}
