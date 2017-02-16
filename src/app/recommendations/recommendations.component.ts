import { Component } from '@angular/core';
import { RecommendationsService } from '../services/recommendations.service';
import { Util } from '../shared/commons';
import { Algorithm } from '../model/algo-rating-dto';

@Component({
    selector: 'recommendations',
    templateUrl: 'recommendations.template.html',
    providers: [RecommendationsService]
})
export class RecommendationsComponent {

    dbScanRecommends: any;
    kMeansRecommends: any;
    knnRecommends: any;
    dbScanType: Algorithm = Algorithm.DBSCAN;
    kMeansType: Algorithm = Algorithm.KMEANS;
    knnType: Algorithm = Algorithm.KNN;

    constructor(private recommendsService: RecommendationsService) {
        Util.toggleNavbarButtonActive('nav-recommendations');
        this.recommendsService.getDbScanRecommends().subscribe(result => {
            this.dbScanRecommends = result;
        }, err => {
            console.log(err);
        });
        this.recommendsService.getKmeansRecommends().subscribe(result => {
            this.kMeansRecommends = result;
        }, err => {
            console.log(err);
        });
        this.recommendsService.getKNNRecommends().subscribe(result => {
            this.knnRecommends = result;
        }, err => {
            console.log(err);
        });
    }

    toggleActive(event) {
        let navbarList: HTMLElement = document.getElementById('recTabs');
        let recommendationsContainer = document.getElementById('recommendations-container');
        for (let i = 0; i < navbarList.children.length; i += 1) {
            navbarList.children.item(i).classList.remove('active');
            recommendationsContainer.children.item(i).classList.remove('active');
        }
        event.target.parentElement.classList.add('active');
        document.getElementById(event.target.parentElement.getAttribute("name")).classList.add('active');
        return false;
    }
}