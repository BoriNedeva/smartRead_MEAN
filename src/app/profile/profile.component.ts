import { Component } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { Util } from '../shared/commons';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'profile',
    templateUrl: 'profile.template.html',
})
export class ProfileComponent {
    lists: any;
    //toReadList: any[];
    //ratedList: any[];

    constructor(private actionsService: ActionsService) {
        Util.toggleNavbarButtonActive('nav-profile');
        this.actionsService.getLists(Cookie.get('currentUser')).subscribe(result => {
            this.lists = result;
        }, err => {
            console.log(err);
        });
    }

    toggleActive(event) {
        let navbarList: HTMLElement = document.getElementById('listTabs');
        let listContainer = document.getElementById('list-container');
        for (let i = 0; i < navbarList.children.length; i += 1) {
            navbarList.children.item(i).classList.remove('active');
            listContainer.children.item(i).classList.remove('active');
        }
        event.target.parentElement.classList.add('active');
        document.getElementById(event.target.parentElement.getAttribute("name")).classList.add('active');
        return false;
    }
}