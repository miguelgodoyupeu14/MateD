import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DijkstraResponse {
  camino: string[];
  costo: number;
  resultado: {
    [key: string]: {
      distancia: number;
      anterior: string | null;
    };
  };
  grafico_base64: string;
  inicio?: string;
  fin?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DijkstraService {

  private baseUrl = 'http://localhost:5000/resolver_dijkstra'; // Cambia esto si tu backend tiene otra URL

  constructor(private http: HttpClient) {}
  resolverDijkstra(data: {
    tipo: 'texto' | 'aristas' | 'enunciado' | 'matriz';
    texto?: string;
    aristas?: [string, string, number][];
    inicio?: string;
    fin?: string;
    enunciado?: string;
  }): Observable<DijkstraResponse> {
    const url = `${this.baseUrl}/resolver_dijkstra`;
    return this.http.post<DijkstraResponse>(this.baseUrl, data);
  }
}
