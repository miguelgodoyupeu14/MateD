import { Component } from '@angular/core';
import { DijkstraResponse, DijkstraService } from '../service/dijkstra.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dijkstra',
  imports: [FormsModule, CommonModule],
  templateUrl: './dijkstra.component.html',
  styleUrl: './dijkstra.component.css'
})
export class DijkstraComponent {
  respuesta?: DijkstraResponse;
  tipo: 'texto' | 'aristas' | 'enunciado' | 'matriz' = 'texto';

  // Entradas comunes
  inicio: string = '';
  fin: string = '';

  // Entrada para texto o enunciado
  texto: string = '';

  // Entrada para aristas
  aristasInput: string = ''; // Ej: "A B 1, B C 2"
  aristas: [string, string, number][] = [];

  // Entrada para matriz
  labelsInput: string = ''; // Ej: "A B C"
  labels: string[] = [];
  matrizInput: string = ''; // Ej: "0 1 0\n0 0 2\n0 0 0"
  matriz: number[][] = [];
  constructor(private dijkstraService: DijkstraService) {}

   calcular() {
    let body: any = { tipo: this.tipo, inicio: this.inicio, fin: this.fin };

    if (this.tipo === 'texto' || this.tipo === 'enunciado') {
      body.texto = this.texto;
      if (this.tipo === 'enunciado') {
        body = { tipo: 'enunciado', enunciado: this.texto }; // usa 'enunciado' en backend
      }
    } else if (this.tipo === 'aristas') {
      const lineas = this.aristasInput.split(',').map(e => e.trim());
      this.aristas = lineas.map(linea => {
        const [u, v, w] = linea.split(/\s+/);
        return [u, v, parseInt(w)];
      });
      body.aristas = this.aristas;
    } else if (this.tipo === 'matriz') {
      this.labels = this.labelsInput.trim().split(/\s+/);
      this.matriz = this.matrizInput.trim().split('\n').map(fila =>
        fila.trim().split(/\s+/).map(Number)
      );
      body.labels = this.labels;
      body.matriz = this.matriz;
    }

    this.dijkstraService.resolverDijkstra(body).subscribe(res => {
      this.respuesta = res;
      if (this.tipo === 'enunciado') {
      if (res.inicio) this.inicio = res.inicio;
      if (res.fin) this.fin = res.fin;
  }
    });
  }
  scrollToEntrada() {
    const element = document.getElementById('entrada');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado al portapapeles');
    });
  }
    getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
