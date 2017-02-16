import { Component, Input } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AlgoRatingDTO, Algorithm } from '../../model/algo-rating-dto';

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

    rateAlgorithm() {
        let algoRatingDTO = new AlgoRatingDTO(Cookie.get('currentUser'), this.type, this.rate);
        this.actionsService.rateAlgorithm(algoRatingDTO);
    }
}