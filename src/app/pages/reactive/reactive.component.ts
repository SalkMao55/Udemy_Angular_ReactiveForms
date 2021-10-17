import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // Por eso con el ! fuerzas la inicialización. (Strict Class Initialization)
  forma!: FormGroup;

  constructor( private fb:FormBuilder,
                private validadores: ValidadoresService) { 
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

  //Getter para usuario, validar que sea valido
  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  }
  //Geters para Direccion
  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  }

  get ciudadNoValida(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }

  //Getter para hacer referencia al formARRAY
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  //Getter para Passwords
  //Para indicar que ingrese una contraseña
  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }
  //Para validar que la contraseña 1 y la 2 sean iguales
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return pass1 === pass2 ? false : true;
  } 



  // Metodo para crear el formulario
  crearFormulario(){
    this.forma = this.fb.group({
      //Variable: ['valor', [validador1_sincrono,val_SincrN], [validador1_Asincrono,val_ASincrN]]
      nombre:     ['',[Validators.required,Validators.minLength(5)]],
      apellido:   ['',[Validators.required,this.validadores.noHerrera]],
      correo:     ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:    ['',[Validators.required,Validators.minLength(3)],this.validadores.existeUsuario],
      pass1:      ['',Validators.required],
      pass2:      ['',Validators.required],
      direccion:  this.fb.group({
        distrito:  ['',Validators.required],
        ciudad  :  ['',Validators.required],
      }),
      pasatiempos: this.fb.array([])
    },{//Seccion para Validaciones hacia el Formulario
      //Los validadores de formulario, las funciones DEBEN RETORNAR UNA FUNCION
      validators:  this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  //Metodo para cargar los datos al formulario
  cargarDataAlFormulario(){
    //this.forma.setValue({ //Referencia de uso de "setValue"
    this.forma.reset({
      nombre:  'Fernando',
      apellido:  'Cabrera Estrada',
      correo:  'fernando.cab_95@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito:  'Guanajuato',
        ciudad:  'Abasolo'
      }
    })
  }

  //Metodo para agregar pasatiempos con el boton "agregar +"
  agregarPasatiempo(){//Trabajamos con FormArray "pasatiempos"
    //this.pasatiempos.push( this.fb.control('Nuevo elemento', Validators.required) );//Ejemplo con Validaciones
    this.pasatiempos.push( this.fb.control('') );
  }

  //Metodo para borrar los pasatiempos con el boton "borrar"
  borrarPasatiempo( i:number ){
    this.pasatiempos.removeAt(i);//Remover de FormArray en un Index seleccionado "i"
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
