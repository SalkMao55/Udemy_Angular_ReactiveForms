import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // Por eso con el ! fuerzas la inicialización. (Strict Class Initialization)
  forma!: FormGroup;

  constructor( private fb:FormBuilder) { 
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  // Metodo para crear el formulario
  crearFormulario(){
    this.forma = this.fb.group({
      nombre:  ['Salomon'],
      apellido:['Canchola'],
      correo:  ['13030564@itcelaya.edu.mx']
    });
  }

  // Metodo para guardar el contenido del formulario
  guardar(){
    console.log(this.forma);
  }

}
