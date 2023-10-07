import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html'
})

export class SearchPageComponent {
    
    public searchInput = new FormControl('');
    public heroes: Hero[] = [];
    public selectedHero?: Hero;
  
    constructor(private _heroesService: HeroesService, private router: Router) { }
  
    searchHero() {
        const value: string = this.searchInput.value || '';    
        this._heroesService.getSuggestions(value).subscribe(heroes => this.heroes = heroes);
    }  
  
    onSelectedOption(event: MatAutocompleteSelectedEvent): void {
        if (!event.option.value) {
            this.selectedHero = undefined;
            return;
        }       
        const hero: Hero = event.option.value;
        this.searchInput.setValue(hero.superhero);
        this.selectedHero = hero;
        
        this._heroesService.getHeroById(hero.id)
            .subscribe( heroe => {
                this.selectedHero = heroe;
                this.router.navigate(['/heroes', this.selectedHero?.id]);
            });
    }
}
