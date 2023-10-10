import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})

export class HeroesService {
    
    private baseUrl: string = environments.baseUrl;

    constructor(private _http: HttpClient) { }

    /* Peticiones AJAX a la base de datos */

    // Obtener todos los héroes
    getHeroes(): Observable<Hero[]> {
        return this._http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    // Obtener un héroe a través de su ID
    getHeroById(id: string): Observable<Hero | undefined> {
        return this._http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe( catchError(error => of(undefined)) );
    }

    // Obtener las sugerencias (autocomplete) al buscar un héroe 
    getSuggestions(query: string): Observable<Hero[]> {
        return this._http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`);
    }

    // Añadir un héroe
    addHero(hero: Hero): Observable<Hero> {
        return this._http.post<Hero>(`${this.baseUrl}/heroes`, hero);
    }
    
    // Actualizar un héroe
    updateHero(hero: Hero): Observable<Hero> {
        if (!hero.id) throw Error('Hero id is required');    
        return this._http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }
    
    // Borrar un héroe
    deleteHeroById(id: string): Observable<boolean> {
        return this._http.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                map(resp => true),
                catchError(err => of(false))
            );
    }
}