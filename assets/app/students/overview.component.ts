import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'child-one',
  template: `
  Child One, reading parent route param.
    <b><code>Parent ID: {{ parentRouteId }}</code></b>
  `
})


export default class Overview {
    parentRouteId: string;
    private sub: any;
      
    constructor(private router: Router,
      private route: ActivatedRoute) {}
      
    ngOnInit() {
      // Get parent ActivatedRoute of this route.
      this.sub = this.router.routerState.parent(this.route)
        .params.subscribe(params => {
          this.parentRouteId = params["id"];
        });
    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
  }