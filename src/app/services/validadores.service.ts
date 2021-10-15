import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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

}
