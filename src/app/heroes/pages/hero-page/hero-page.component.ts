import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-hero-page',
    templateUrl: './hero-page.component.html'
})

export class HeroPageComponent implements OnInit {
    
    public hero?: Hero;

    constructor(
        private _heroesService: HeroesService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._activatedRoute.params
            .pipe(
                switchMap( ({id}) => this._heroesService.getHeroById(id) ),
            )
            .subscribe(hero => {
                if (!hero) return this._router.navigate(['/heroes/list']);
                this.hero = hero;
                return;
            });
    }

    goBack(): void {
        this._router.navigateByUrl('heroes/list');
    }
}
