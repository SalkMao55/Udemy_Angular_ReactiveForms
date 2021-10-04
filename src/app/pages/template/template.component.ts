import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre:'Salomon',
    apellido:'Canchola Espinoza',
    correo:'13030564@itcelaya.edu.mx',
    pais: '03',
    genero: "M"
  }

  //Propiedad para obtener los datos de los estados de la INEGI
  estados: any[] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( estados =>{
      this.estados = estados;
      //Dar valor por defecto al select de ESTADOS
      this.estados.unshift({
        nombre: 'Seleccione Estado',
        codigo: '' //Si condigo no tiene valor, lo muestra por defecto en el select
      })//Insertar en ARRAY estados
      // console.log(this.estados);
    });
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
