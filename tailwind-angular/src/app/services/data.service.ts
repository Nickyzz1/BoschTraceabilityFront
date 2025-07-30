import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStation, IPart, IMoviment } from '../models/interfaces.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'http://localhost:5296/api/v1';

  stations = signal<IStation[]>([]);
  parts = signal<IPart[]>([]);
  moviments = signal<IMoviment[]>([]);

  constructor(private http: HttpClient) {}

  //gets

  getStations() {
    return this.http.get<IStation[]>(`${this.apiUrl}/station`);
  }

  getParts() {
    return this.http.get<IPart[]>(`${this.apiUrl}/part`);
  }

  getMoviments() {
    return this.http.get<IMoviment[]>(`${this.apiUrl}/moviment`);
  }

  getMaxStation() {
    return this.http.get<number>(`${this.apiUrl}/station/max`);
  }

  //posts

  addPart(part: { Code: string; Status: string; CurStationId: number }) {
    return this.http.post<IPart>(`${this.apiUrl}/part`, part);
  }

  loadAll() {
    this.getStations();
    this.getParts();
    this.getMoviments();
  }

  // Atualizar código da peça (PUT)
  updatePartCode(partId: number, newCode: string) {
    return this.http.put<IPart>(`${this.apiUrl}/part/${partId}`, { Code: newCode});
  }

  // Excluir peça (DELETE)
  deletePart(partId: number) {
    return this.http.delete<void>(`${this.apiUrl}/part/${partId}`);
  }
}
