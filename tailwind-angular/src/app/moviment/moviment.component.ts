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
  

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getStations().subscribe(stations => this.stations = stations);
  }

  registrarMovimentacao() {
    if (this.code.trim() === '') {
      alert("Código da peça está vazio.");
      return;
    }

    this.dataService.getPartByCode(this.code).subscribe({
      next: (part) => {
        if (!part) {
          alert(" Peça não encontrada.");
          return;
        }

        this.part = part;
        console.log(part)

       const curStationId = this.part.curStationId;
       console.log(curStationId)

      // 1. Verifica se a estação atual existe
      const currentStation = this.stations.find(s => s.id === curStationId);
      if (!currentStation) {
        alert("Estação atual não encontrada.");
        return;
      }

      console.log(currentStation)

      // 2. Pega o sort atual e soma +1
      const nextSort = currentStation.sort + 1;
      console.log(nextSort)

      // 3. Busca a próxima estação
      const nextStation = this.stations.find(s => s.sort === nextSort);
      if (!nextStation) {
        alert("Não há próxima estação definida.");
        return;
      }

      console.log(nextStation)

      // 4. Monta o objeto de movimentação
      const moviment = {
        PartId: this.part.id,
        DestinationStationId: nextStation.id,
        Responsable: this.responsable ?? 'Desconhecido'
      };

        console.log(moviment)
        

        this.dataService.addMoviment(moviment).subscribe({
          next: (mov) => {
            console.log("Movimentação registrada:", mov);
            alert("Movimentação realizada com sucesso!");
          },
          error: (err) => {
            console.error("Erro ao registrar movimentação:", err);
            alert("Erro ao registrar movimentação.");
          }
        });
      },
      error: (err) => {
        console.error("Erro ao buscar peça:", err);
        alert("Erro ao buscar a peça.");
      }
    });
  }
}


