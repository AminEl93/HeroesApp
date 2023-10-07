import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})

export class HeroesService {
    
    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    /* Peticiones AJAX a la base de datos */

    // Obtener todos los héroes
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    // Obtener un héroe a través de su ID
    getHeroById(id: string): Observable<Hero | undefined> {
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe( catchError(error => of(undefined)) );
    }

    // Obtener las sugerencias (autocomplete) al buscar un héroe 
    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`);
    }
}