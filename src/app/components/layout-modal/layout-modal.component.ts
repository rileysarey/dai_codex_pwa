import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-layout-modal",
  templateUrl: "layout-modal.component.html",
  styleUrls: ["layout-modal.component.scss"],
})
export class LayoutModalComponent implements OnInit {
  @Input() isGrid: boolean;
  @Input() isShowTitle: boolean;

  @Output() onGrid = new EventEmitter<void>();
  @Output() onList = new EventEmitter<void>();
  @Output() onShowTitle = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  private switch: Element;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  onGridHandler() {
    this.onGrid.emit();
  }

  onListHandler() {
    this.onList.emit();
  }

  onSwitched() {
    if(this.isGrid) {
      this.onShowTitle.emit();
    }
  }

  closeHandler() {
    this.onClose.emit();
  }
}
