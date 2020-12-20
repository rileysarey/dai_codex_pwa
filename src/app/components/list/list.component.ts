import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: "list.component.html",
  styleUrls: ["list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() list: any; 
  @Output() onTileClicked = new EventEmitter<void>();

  private queue = 0; 
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async goToCodex(link: string, element: HTMLElement) {
    if(this.queue == 0) {
      this.queue = 1; 
      element.classList.add("overlay-show");
      this.onTileClicked.emit();
    }
    
    // NOTE: MUST WAIT to finish the opacity transition on the Tarot Card
    await new Promise((resolve) => setTimeout(resolve, 350));
    this.router.navigateByUrl(link);
    this.queue = 0;
  }
}
