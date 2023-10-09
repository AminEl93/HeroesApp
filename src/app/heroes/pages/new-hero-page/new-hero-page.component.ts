import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
        private dialog: MatDialog
    ) { }

    // Obtener el héroe actual
    get currentHero(): Hero {
        const hero = this.heroForm.value as Hero;
        return hero;
    }

    ngOnInit(): void {
        if (!this.router.url.includes('edit')) return;

        // Obtener un héroe mediante su ID
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
            // Guardar un héroe actualizado
            this._heroesService.updateHero(this.currentHero)
                .subscribe(hero => {
                    this.router.navigate(['/heroes/list']);
                    this.showSnackbar(`${hero.superhero} actualizado!`);
                });
      
            return;
        }

        // Guardar un héroe creado
        this._heroesService.addHero(this.currentHero)
            .subscribe(hero => {
                this.router.navigate(['/heroes/list']);
                this.showSnackbar(`${hero.superhero} creado!`);
            });      
    }

    // Borrar un héroe creado o actualizado mediante un Material Dialog
    onDeleteHero() {
        if (!this.currentHero.id) throw Error('Hero id is required');
    
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: this.heroForm.value
        });
    
        dialogRef.afterClosed()
            .pipe(
                filter( (result: boolean) => result ),
                switchMap( () => this._heroesService.deleteHeroById(this.currentHero.id) ),
                filter( (wasDeleted: boolean) => wasDeleted )
            )
            .subscribe(() => {
                this.router.navigate(['/heroes']);
            });
    
        /*
        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result) return;            
                this._heroesService.deleteHeroById(this.currentHero.id)
                    .subscribe(wasDeleted => {
                        if (wasDeleted) { this.router.navigate(['/heroes']); }
                    });
            });
        */    
    }    

    // Mostrar los snackbars de confirmación
    showSnackbar(message: string): void {
        this._snackbar.open(message, 'Cerrar', { duration: 3000 });
    }
}
