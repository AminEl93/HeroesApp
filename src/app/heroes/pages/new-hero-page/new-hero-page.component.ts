import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-new-hero-page',
    templateUrl: './new-hero-page.component.html'
})

export class NewHeroPageComponent implements OnInit {

    // Formulario reactivo
    public heroForm = new FormGroup({
        id: new FormControl<string>(''),
        superhero: new FormControl<string>('', { nonNullable: true }),
        publisher: new FormControl<Publisher>(Publisher.DCComics),
        alter_ego: new FormControl(''),
        first_appearance: new FormControl(''),
        characters: new FormControl(''),
        description: new FormControl(''),
        alt_img: new FormControl('')
    });

    public publishers = [
        { id: 'DC Comics', label: 'DC - Comics' },
        { id: 'Marvel Comics', label: 'Marvel - Comics' }
    ];

    constructor(
        private _heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _snackbar: MatSnackBar,
    ) { }

    // Obtener el héroe actual
    get currentHero(): Hero {
        const hero = this.heroForm.value as Hero;
        return hero;
    }

    ngOnInit(): void {
        if (!this.router.url.includes('edit')) return;

        this.activatedRoute.params
            .pipe(
                switchMap( ({id}) => this._heroesService.getHeroById(id) ),
            ).subscribe(hero => {
                if (!hero) { return this.router.navigateByUrl('/'); }
                this.heroForm.reset(hero);
                return;
            });
    }

    onSubmit(): void {        
        if (this.heroForm.invalid) return;
        
        if (this.currentHero.id) {
            this._heroesService.updateHero(this.currentHero)
                .subscribe(hero => {
                    this.router.navigate(['/heroes/list']);
                    this.showSnackbar(`${hero.superhero} actualizado!`);
                });
      
            return;
        }

        this._heroesService.addHero(this.currentHero)
            .subscribe(hero => {
                this.router.navigate(['/heroes/list']);
                this.showSnackbar(`${hero.superhero} creado!`);
            });      
    }

    showSnackbar(message: string): void {
        this._snackbar.open(message, 'Cerrar', { duration: 3000 });
    }
}
