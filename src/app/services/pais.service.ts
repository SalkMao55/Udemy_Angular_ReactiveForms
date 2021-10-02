import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  getPaises(){
    // https://restcountries.eu/rest/v2/lang/es
    return this.http.get('https://gaia.inegi.org.mx/wscatgeo/mgee/').
            pipe(
              map( (estados:any) => { //Obtener arreglo de datos
                return Object.values(estados.datos)//De propiedad arreglo "datos" obtendremos los estados
                .map((estado:any)=>{//Datos a obtener de cada estado
                  return {
                    nombre: estado.nom_agee,
                    codigo: estado.cve_agee
                  }
                }); 
              })
            );
  }
  
}
