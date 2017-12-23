import { Component,OnInit,ElementRef } from "@angular/core";
import { ModalService } from './../modal/modal.service';
import {Error} from './error.model';
import { ErrorService } from "./error.service";


@Component({
    selector: 'app-error',
    templateUrl : './error.component.html'
})
export class ErrorComponent implements OnInit {
    error : Error;
    showModal = false;
    constructor(private modalService : ModalService, private errorService : ErrorService, private elRef:ElementRef){
    
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id : string,e) {
        e.stopPropagation();
        this.modalService.close(id);
    }

    ngOnInit(){
        this.errorService.errorOccured.subscribe((error : Error) => {
            this.error = error;
            this.openModal('errorModal');
        })
    }
}