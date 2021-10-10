import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

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

  //Geter (es como una propiedad)
  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  // Metodo para crear el formulario
  crearFormulario(){
    this.forma = this.fb.group({
      //Variable: ['valor',[validador1,val_N]]
      nombre:  ['',[Validators.required,Validators.minLength(5)]],
      apellido:['',Validators.required],
      correo:  ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  // Metodo para guardar el contenido del formulario
  guardar(){
    console.log(this.forma);
    //Impedir guardar datos si no es VALIDO el FORMULARIO
    if (this.forma.invalid) {
      // The Object.values() method returns an array of a given object's own enumerable property values,
      // in the same order as that provided by a for...in loop.
      return Object.values( this.forma.controls ).forEach( control => { //Por cada "Control" del formulario
        //Marcar para mostrar alertas en Inputs
        control.markAsTouched();
      });
    }
  }

}
