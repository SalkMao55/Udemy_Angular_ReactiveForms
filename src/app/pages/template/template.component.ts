import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre:'Salomon',
    apellido:'Canchola Espinoza',
    correo:'13030564@itcelaya.edu.mx'
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar( forma: NgForm ){
    console.log( forma );
    
    //Impedir guardar datos si no es VALIDO el FORMULARIO
    if (forma.invalid) {
      // The Object.values() method returns an array of a given object's own enumerable property values,
      // in the same order as that provided by a for...in loop.
      Object.values( forma.controls ).forEach( control => { //Por cada "Control" del formulario
        //Marcar para mostrar alertas en Inputs
        control.markAsTouched();
      });
      return;
    }

    console.log( forma.value );
  }

}
