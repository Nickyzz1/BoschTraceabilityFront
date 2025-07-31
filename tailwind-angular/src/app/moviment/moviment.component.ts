import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { DataService } from '../services/data.service';
import { IMovimentCreate, IMovimentGet, IPart, IStation } from '../models/interfaces.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NzIconModule, FormsModule, NzInputModule, CommonModule, NzButtonModule, FormsModule, NzBadgeModule],
  templateUrl: './moviment.component.html',
})
export class MovimentComponent {
  part: IPart | null = null;
  code: string = '';
  responsable: string | null = null;
  stations: IStation[] = [];
  parts: IPart[] = [];
  stationsWithParts: { name: string, id: number, parts: IPart[] }[] = [];



  constructor(public dataService: DataService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.dataService.getStations().subscribe(stations => this.stations = stations);
    this.dataService.getParts().subscribe(parts => { this.parts = parts });
    this.dataService.getStations().subscribe(stations => {
      this.dataService.getParts().subscribe(parts => {
        this.stationsWithParts = stations.map(station => ({
          id: station.id,
          name: station.title,
          parts: parts.filter(p => p.curStationId === station.id)
        }));
      });
    });
  }

  registrarMovimentacao() {
    if (this.code.trim() === '') {
      this.notification.error(
        'Campos vazios!',
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

    this.dataService.getPartByCode(this.code).subscribe({
      next: (part) => {
        if (!part) {
          this.notification.error(
            'Peça não encontrada',
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

        this.part = part;
        console.log(part)

        const curStationId = this.part.curStationId;

        // verifica se a estação atual existe
        const currentStation = this.stations.find(s => s.id === curStationId);
        if (!currentStation) {
          this.notification.error(
            'Estação atual não encontrada',
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

        // pega o sort atual e soma +1
        const nextSort = currentStation.sort + 1;

        // busca a próxima estação
        const nextStation = this.stations.find(s => s.sort === nextSort);
        if (!nextStation) {
          this.notification.error(
            'Não há uma próxima estação definida',
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

        // monta o objeto de movimentação
        const moviment = {
          PartId: this.part.id,
          DestinationStationId: nextStation.id,
          Responsable: this.responsable ?? 'Desconhecido'
        };

        this.dataService.addMoviment(moviment).subscribe({
          next: (mov) => {
            this.notification.success(
              'Sucesso',
              'Movimentação realizada com sucesso',
              {
                nzStyle: {
                  backgroundColor: '#1DAF3FFF',
                },
                nzClass: 'custom-notification'
              }
            );
          },
          error: (err) => {
            console.error("Erro ao registrar movimentação:", err);
            this.notification.error(
              'Erro ao registrar movimentação',
              '',
              {
                nzStyle: {
                  backgroundColor: '#AF0848FF',
                },
                nzClass: 'custom-notification'
              },
            );
          }
        });
      },
      error: (err) => {
        console.error("Erro ao buscar peça:", err);
        this.notification.error(
          'Erro ao buscar peças',
          '',
          {
            nzStyle: {
              backgroundColor: '#AF0848FF',
            },
            nzClass: 'custom-notification'
          },
        );
      }
    });
  }

  convertToPascalCase(obj: any): any {
  const newObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[pascalKey] = obj[key];
    }
  }
  return newObj;
}

  moverParaProximaEstacao(part: IPart) {
  const currentStation = this.stations.find(s => s.id === part.curStationId);
  if (!currentStation) return;

  const nextStation = this.stations.find(s => s.sort === currentStation.sort + 1);
  if (!nextStation) {
    this.notification.warning('Atenção', 'Peça já está na última estação');
    return;
  }

  const moviment = {
    partId: part.id,
    DestinationStationId: nextStation.id,
    responsable: this.responsable ?? 'Desconhecido'
  };

  const payload = this.convertToPascalCase(moviment);

  this.dataService.addMoviment(payload).subscribe({
    next: res => {
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
      this.ngOnInit(); // <- recarrega para atualizar as estações
    },
    error: err => {
      console.error('Erro ao adicionar movimentação:', err);
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
    }
  });

  }
}


