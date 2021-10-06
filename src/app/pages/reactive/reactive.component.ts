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
  }

}
