import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean //Retorna cualquier cantidad de llaves y el valor de ellas sera BOLEANO
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  //Servicio para crear una coleccionde validadores

  //Metodo para validar si un usuario existe
  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    //Evitar que compruebe INMEDIATAMENT al cargar la pagina (caso del curso, no ocurre en ANGULAR 11)
    /* if (!control.value) {
      return Promise.resolve(null);
    } */
    
    //Promesa asincrona, dura 3.5 segundos para verificar si existe el nombre de usuario
    return new Promise( (resolve, reject) => {
      setTimeout(()=>{
        if( control.value === 'strider' ){
          resolve({ existe: true });
        } else {
          resolve (null);
        }
      }, 3500);
    } );
  }

  //Metodo para no aceptar apellido herrera
  noHerrera( control: FormControl ): ErrorValidate {
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
