import { Component, Input } from '@angular/core';
import { ActionsService } from '../../services/actions.service';

@Component({
    selector: 'list-block',
    templateUrl: 'list-block.template.html'
})
export class ListBlockComponent {

    @Input() data;

    public isReadonly: boolean = false;
    public showRating = true;
    public rate = true;
    
    constructor(private actionsService: ActionsService){}
}