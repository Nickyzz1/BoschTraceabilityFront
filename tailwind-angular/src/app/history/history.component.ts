import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NzIconModule, FormsModule, NzInputModule, NzButtonModule, CommonModule,
        NzTableModule, NzBadgeModule
    ],
    templateUrl: './history.component.html',
})
export class HistoryComponent {
    value: number | null = null;
    data = [
        {
            codigo: '001',
            dataCriacao: '28/07/2025, 19:41',
            estacaoAtual: 'Recebimento -> Na linha',
            status: 'Em Processamento',
        },
            {
            codigo: '001',
            dataCriacao: '28/07/2025, 19:41',
            estacaoAtual: 'Recebimento -> Na linha',
            status: 'Em Processamento',
        },
            {
            codigo: '001',
            dataCriacao: '28/07/2025, 19:41',
            estacaoAtual: 'Recebimento -> Na linha',
            status: 'Em Processamento',
        },
            {
            codigo: '001',
            dataCriacao: '28/07/2025, 19:41',
            estacaoAtual: 'Recebimento -> Na linha',
            status: 'Em Processamento',
        },
        
    ];
}