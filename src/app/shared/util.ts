import { Events } from './commons';
import { Cookie } from 'ng2-cookies/ng2-cookies';

export class Util {

    static toggleNavbarButtonActive(id: string) {
        if (!Cookie.get('currentUser')) {
            Events.onUserLoggedOut.emit();
        } else {
            Events.onUserLogged.emit();
        }
        setTimeout(() => {
            let navbarList: HTMLElement = document.getElementById('navbarList');
            for (let i = 0; i < navbarList.children.length; i += 1) {
                navbarList.children.item(i).classList.remove('active');
            }
            document.getElementById(id).classList.add('active');
        }, 0);
    }

    static checkIfUserLoggedOut() : boolean {
        if (!Cookie.get('currentUser')) {
            Events.onUserLoggedOut.emit();
            return true;
        }
        return false;
    }
}