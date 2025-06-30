import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProcesarEnunciadoResponse {
  enunciado: string;
  leyes_aplicadas: string[];
  proposicion: string;
  proposicion_simplificada: string;
  variables: string[];
}

export interface EvaluarProposicionResponse {
  proposicion: string;
  proposicion_convertida: string;
  resultado_final: boolean[];
  resultados: {
    resultado: boolean;
    valores: { [key: string]: boolean };
  }[];
  variables: string[];
}


export interface RespuestaProposicionResponse2 {
    tipo: string,
        n: number,
        r: number,
        resultado: number
}
export interface EvaluarProposicionResponse2 {
    elementos_seleccionados: number,
    importa_orden: boolean,
    seleccion_repetida: boolean,
    todos_participan: boolean,
    total_elementos: number
}
@Injectable({
  providedIn: 'root'
})
export class LeyesService {
  private baseUrl = 'http://127.0.0.1:5000'; // Cambia esto si tu backend tiene otra URL

  constructor(private http: HttpClient) {}

  procesarEnunciado(enunciado: string): Observable<ProcesarEnunciadoResponse> {
    const url = `${this.baseUrl}/procesar_enunciado`;
    return this.http.post<ProcesarEnunciadoResponse|any>(url, { enunciado });
  }

  evaluarProposicion(proposicion: string): Observable<EvaluarProposicionResponse> {
    const url = `${this.baseUrl}/evaluar`;
    return this.http.post<EvaluarProposicionResponse>(url, { proposicion });
  }


   procesarEnunciadoComb(enunciado: string): Observable<EvaluarProposicionResponse2> {
    const url = `${this.baseUrl}/analizar_enunciado`;
    return this.http.post<EvaluarProposicionResponse2|any>(url, { enunciado });
  }

  evaluarProposicionComb(proposicion: EvaluarProposicionResponse2): Observable<RespuestaProposicionResponse2> {
    const url = `${this.baseUrl}/resolver_combinatoria`;
    // Enviar el objeto directamente, no dentro de {proposicion: ...}
    return this.http.post<RespuestaProposicionResponse2>(url, proposicion);
  }
}
