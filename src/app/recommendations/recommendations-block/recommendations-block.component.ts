import { Component, Input } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'recommendations-block',
    templateUrl: 'recommendations-block.template.html'
})
export class RecommendationsBlockComponent {

    @Input() data;
    @Input() type : Algorithm;

    constructor(private actionsService: ActionsService){}

    public max: number = 5;
    public rate: number = 0;
    public isReadonly: boolean = false;
    public showRating = true;
}