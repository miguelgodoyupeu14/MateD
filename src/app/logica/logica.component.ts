import { Component } from '@angular/core';

@Component({
  selector: 'app-logica',
  standalone: true,
  imports: [],
  templateUrl: './logica.component.html',
  styleUrls: ['./logica.component.css']
})
export class LogicaComponent {
  scrollToEntrada() {
    const element = document.getElementById('entrada');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
