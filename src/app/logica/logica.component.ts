import { Component } from '@angular/core';
import { EvaluarProposicionResponse, LeyesService, ProcesarEnunciadoResponse } from '../service/leyes.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logica',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './logica.component.html',
  styleUrls: ['./logica.component.css']
})
export class LogicaComponent {
  cargando: boolean = false; // Estado de carga
  cargando2: boolean = false; // Estado de carga
  enunciado: string = '';
  propo: string = '';
  proposicion: string = '';
  resultadoProcesar: ProcesarEnunciadoResponse | any = null;
  resultadoEvaluar: EvaluarProposicionResponse | any = null;
  tipoProposicion: string = ''; // Variable para almacenar el tipo de proposición

  constructor(private leyesService: LeyesService, private toastr: ToastrService) {}

  procesarEnunciado(): void {
    if (!this.enunciado) return; // Evitar enviar una solicitud vacía
    this.cargando = true;
    this.leyesService.procesarEnunciado(this.enunciado).subscribe(
      (response:any) => {
        this.resultadoProcesar = response;
        this.cargando = false;
        console.log('Resultado de procesar enunciado:', response);
      },
      (error:any) => {
        this.cargando = false;
        this.resultadoEvaluar = null;
        this.toastr.error('Error al Procesar Enunciado', 'Error');
        console.error('Error al procesar el enunciado:', error);
      }
    );
  }

  evaluarProposicion(): void {
    if (!this.proposicion) return; // Evitar enviar una solicitud vacía
    this.propo = this.proposicion;
    this.cargando2 = true;
    this.leyesService.evaluarProposicion(this.propo).subscribe(
      (response:any) => {
        this.resultadoEvaluar = response;
        this.cargando2 = false;
        this.determinarTipoProposicion(response.resultado_final);
        console.log('Resultado de evaluar proposición:', response);
      },
      (error:any) => {
        this.cargando2 = false;
        this.resultadoEvaluar = null;
        this.toastr.error('Error al Evaluar Proposición', 'Error');
        console.error('Error al evaluar la proposición:', error);
      }
    );
  }

  determinarTipoProposicion(resultadoFinal: boolean[]): void {
    const todosVerdaderos = resultadoFinal.every((resultado) => resultado === true);
    const todosFalsos = resultadoFinal.every((resultado) => resultado === false);

    if (todosVerdaderos) {
      this.tipoProposicion = 'TAUTOLOGÍA';
    } else if (todosFalsos) {
      this.tipoProposicion = 'CONTRADICCIÓN';
    } else {
      this.tipoProposicion = 'CONTINGENCIA';
    }
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
}
