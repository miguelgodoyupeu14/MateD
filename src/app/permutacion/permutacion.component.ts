import { Component } from '@angular/core';
import { EvaluarProposicionResponse, EvaluarProposicionResponse2, LeyesService, ProcesarEnunciadoResponse, RespuestaProposicionResponse2 } from '../service/leyes.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-permutacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './permutacion.component.html',
  styleUrl: './permutacion.component.css'
})
export class PermutacionComponent {
cargando: boolean = false; // Estado de carga
  cargando2: boolean = false; // Estado de carga
  enunciado: string = '';;
  propo: EvaluarProposicionResponse2 | any = null;
  proposicion: string = '';
  tipoProposicion: string = ''; // Variable para almacenar el tipo de proposición
  tipoResultado: string = ''; // Variable para almacenar el tipo de resultado

  resultadoEvaluar: RespuestaProposicionResponse2 = {
    tipo: '',
    n: 0,
    r: 0,
    resultado: 0
  }


  resultadoProcesar:EvaluarProposicionResponse2 = {
    total_elementos: 0,
    elementos_seleccionados: 0,
    importa_orden: false,
    todos_participan: false,
    seleccion_repetida: false
  };
  inputData:EvaluarProposicionResponse2 = {
    total_elementos: 0,
    elementos_seleccionados: 0,
    importa_orden: false,
    todos_participan: false,
    seleccion_repetida: false
  };

  constructor(private leyesService: LeyesService, private toastr: ToastrService) {}

  procesarEnunciado(): void {
    if (!this.enunciado) return; // Evitar enviar una solicitud vacía
    this.cargando = true;
    this.leyesService.procesarEnunciadoComb(this.enunciado).subscribe(
      (response:any) => {
        this.resultadoProcesar = response;
        this.cargando = false;
        console.log('Resultado de procesar enunciado:', response);
      },
      (error:any) => {
        this.cargando = false;
        this.toastr.error('Error al Procesar Enunciado', 'Error');
        console.error('Error al procesar el enunciado:', error);
      }
    );
  }

  copiaraCalculadora(): void {
    console.log('Resultado de procesar enunciado:', this.resultadoProcesar);
    this.inputData = { ...this.resultadoProcesar };
    this.evaluarProposicion();
  }

  evaluarProposicion(): void {
    // Si se está usando el formulario estructurado
    if (this.inputData.total_elementos !== null && this.inputData.elementos_seleccionados !== null) {
      this.cargando2 = true;
      this.leyesService.evaluarProposicionComb(this.inputData).subscribe(
        (response: any) => {
          this.resultadoEvaluar = response;
          this.cargando2 = false;
          this.tipoProposicion = response.tipo;
          this.tipoResultado = this.determinarTipoProposicion2(this.tipoProposicion);
          console.log('Resultado de evaluar proposición:', response);

        },
        (error: any) => {
          this.cargando2 = false;
          this.toastr.error('Error al Evaluar Proposición', 'Error');
          console.error('Error al evaluar la proposición:', error);
        }
      );
      return;
    }
    if (!this.proposicion) return; // Evitar enviar una solicitud vacía
    this.propo = this.proposicion;
    this.cargando2 = true;
    this.leyesService.evaluarProposicionComb(this.propo).subscribe(
      (response:any) => {
        this.resultadoEvaluar = response;
        this.cargando2 = false;
        this.determinarTipoProposicion(response.resultado_final);
        console.log('Resultado de evaluar proposición:', response);
      },
      (error:any) => {
        this.cargando2 = false;
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
  determinarTipoProposicion2(tipo : string): string {

    if (tipo.includes('Permu')) {
      return 'Permutacion';
    } else if (tipo.includes('Comb')) {
      return 'Combinatoria';
    } else if (tipo.includes('Varia')) {
      return 'Combinatoria';
    } else {
      return 'Desconocido';
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
