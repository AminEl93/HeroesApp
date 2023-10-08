import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Publisher } from '../../interfaces/hero.interface';

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

    constructor() { }

    ngOnInit(): void {
        
    }
}
