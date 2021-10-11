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
    this.cargarDataAlFormulario();
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
  //Geters para Direccion
  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  }

  get ciudadNoValida(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }



  // Metodo para crear el formulario
  crearFormulario(){
    this.forma = this.fb.group({
      //Variable: ['valor',[validador1,val_N]]
      nombre:     ['',[Validators.required,Validators.minLength(5)]],
      apellido:   ['',Validators.required],
      correo:     ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion:  this.fb.group({
        distrito:  ['',Validators.required],
        ciudad  :  ['',Validators.required],
      })
    });
  }

  //Metodo para cargar los datos al formulario
  cargarDataAlFormulario(){
    //this.forma.setValue({ //Referencia de uso de "setValue"
    this.forma.reset({
      nombre:  'Fernando',
      apellido:  'Cabrera Estrada',
      correo:  'fernando.cab_95@gmail.com',
      direccion: {
        distrito:  'Guanajuato',
        ciudad:  'Abasolo'
      }
    })
  }

  // Metodo para guardar el contenido del formulario
  guardar(){
    console.log(this.forma);
    //Impedir guardar datos si no es VALIDO el FORMULARIO
    if (this.forma.invalid) {
      // The Object.values() method returns an array of a given object's own enumerable property values,
      // in the same order as that provided by a for...in loop.
      return Object.values( this.forma.controls ).forEach( control => { //Por cada "Control" del formulario
        if (control instanceof FormGroup ) {
          //Marcar componentes del Objeto o control conformado por un FormGroup, este caso DIRECCION
          Object.values( control.controls ).forEach( subcontrol => subcontrol.markAsTouched() );
        }
        else{
          //Marcar para mostrar alertas en Inputs
          control.markAsTouched();
        }
      });
    }

    //Posteo de informacion
    //Reseteamos los campos del formulario una vez posteada la informacion
    this.forma.reset({
      nombre: 'Sin Nombre'
    });
  }

}
