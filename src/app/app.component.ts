import { Component } from '@angular/core';
import { LogicaComponent } from './logica/logica.component'; // ✅ Importar el componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LogicaComponent], // ✅ Agregarlo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matediscreta';
}
