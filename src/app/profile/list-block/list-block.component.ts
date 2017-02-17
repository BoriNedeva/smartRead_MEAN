import { Component, Input } from '@angular/core';
import { ActionsService } from '../../services/actions.service';

@Component({
    selector: 'list-block',
    templateUrl: 'list-block.template.html'
})
export class ListBlockComponent {

    @Input() data;

    constructor(private actionsService: ActionsService){}

    public max: number = 5;
    public rate: number = 0;
    public isReadonly: boolean = false;
    public showRating = true;
}