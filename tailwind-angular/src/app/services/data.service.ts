import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStation, IPart, IMoviment } from '../models/interfaces.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'http://localhost:5296/api/v1';

  stations = signal<IStation[]>([]);
  parts = signal<IPart[]>([]);
  moviments = signal<IMoviment[]>([]);

  constructor(private http: HttpClient) {}

  // Gets
  getStations() {
    return this.http.get<IStation[]>(`${this.apiUrl}/station`);
  }

  getParts() {
    return this.http.get<IPart[]>(`${this.apiUrl}/part`);
  }

  getPartById(id: number) {
    return this.http.get<IPart[]>(`${this.apiUrl}/part/${id}`);
  }

  getPartByCode(code: string) : Observable<IPart>  {
    return this.http.get<IPart>(`${this.apiUrl}/part/code/${code}`);
  }

  getMoviments() {
    return this.http.get<IMoviment[]>(`${this.apiUrl}/moviment`);
  }

  getMaxStation() {
    return this.http.get<number>(`${this.apiUrl}/station/max`);
  }

  loadAll() {
    this.getStations().subscribe((data) => this.stations.set(data));
    this.getParts().subscribe((data) => this.parts.set(data));
    this.getMoviments().subscribe((data) => this.moviments.set(data));
  }

  // Posts
  addPart(part: { Code: string; Status: string; CurStationId: number }) {
    return this.http.post<IPart>(`${this.apiUrl}/part`, part);
  }

  addStation(station: { title: string; sort: number }) {
    return this.http.post<IStation>(`${this.apiUrl}/station`, station);
  }

  addMoviment(moviment: { PartId: number; DestinationStationId: number, Responsable : string }) {
    return this.http.post<IMoviment>(`${this.apiUrl}/moviment`, moviment);
  }

  // Updates
  updatePartCode(partId: number, newCode: string) {
    return this.http.put<IPart>(`${this.apiUrl}/part/${partId}`, { Code: newCode });
  }

  updateStation(id: number, data: Partial<IStation>): Observable<any> {
    return this.http.put(`${this.apiUrl}/station/${id}`, data);
  }

  // Deletes
  deletePart(partId: number) {
    return this.http.delete<void>(`${this.apiUrl}/part/${partId}`);
  }

  deleteStation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/station/${id}`);
  }
}
