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
              map( resp => { return resp; } )
            );
  }
  
}
