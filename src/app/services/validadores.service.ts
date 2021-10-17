import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  //Servicio para crear una coleccionde validadores

  //Metodo para no aceptar apellido herrera
  noHerrera( control: FormControl ):{ [s:string]: boolean } {
    //Retornar OBJETO si no se cumple validación de "No ser herrera"
    if (control.value?.toLowerCase() === 'herrera' ){
      return {
        noHerrera: true
      }
    }
    //No es "herrera" retornar null
    return null;
    
  }

  //Metodo para validar que las contraseñas sean iguales
  passwordsIguales( pass1Name: string, pass2Name: string ){
    //Funcion para Formulario, retorna la siguiente funcion
    return ( formGroup: FormGroup ) =>{ //La funcion retorna un FormGroup (para asignar valores al que llamo la funcion)
      //Hacer referencia a ambos controles del FormGroup
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      //Validar
      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
