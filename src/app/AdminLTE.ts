import {Injectable} from '@angular/core';

@Injectable()
export class AdminLTE {

    fix() {
        eval('($.AdminLTE.layout ? $.AdminLTE.layout.fix() : "")');
    }
    pushMenu() {
        eval('($.AdminLTE.pushMenu ? $.AdminLTE.pushMenu.activate() : "")');
    }

    menuExpand() {
        eval('($.AdminLTE.pushMenu ? $.AdminLTE.pushMenu.expand() : "")');
    }

    menuCollapse() {
        eval('($.AdminLTE.pushMenu ? $.AdminLTE.pushMenu.collapse() : "")');
    }

}
