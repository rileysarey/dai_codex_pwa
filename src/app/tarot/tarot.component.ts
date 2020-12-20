import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LayoutModalComponent } from "../components/layout-modal/layout-modal.component";
import { Categories } from "../models/categories";
import { ScrollLengthService } from "../services/scroll-length.service";

@Component({
  selector: "app-tarot",
  templateUrl: "tarot.component.html",
  styleUrls: ["tarot.component.scss"],
})
export class TarotComponent implements OnInit {
  public codices: any[];
  public category: string;
  public maxWidth = 328;
  public numOfCards = 0;
  public width = null;
  public yPosition = 0;
  public innerHeight = 0;
  private emptyQueue = true;
  private activeModal = null;

  // ANCHOR: Layout
  // Will need to store this in the cookies or the storage as PWA
  // Will need to be stored in a different component all together
  public isGrid = false;
  public isShowTitle = true;

  constructor(
    private route: ActivatedRoute,
    private scrollLength: ScrollLengthService,
    private router: Router,
    private modalService: NgbModal
  )
  { }

  ngOnInit() {
    window.scroll(0, 0);
    this.innerHeight = window.innerHeight;
    console.log("inner height: " + this.innerHeight);

    this.getTarots();
    if(this.isGrid) this.instantiateTarots();

    this.setScrollYPosition();
  }

  getTarots() {
    this.category = this.route.snapshot.paramMap.get("category");

    import(`../../assets/json/${this.category}.json`).then((data) => {
      this.codices = data.default;
    });
  }

  instantiateTarots() {
    let tarotContainer = document.getElementById("tarot-container");
    let tarotContainerWidth = tarotContainer.getBoundingClientRect().width;

    if (tarotContainerWidth > this.maxWidth) {
      let numOfCards = tarotContainerWidth / this.maxWidth;
      numOfCards = numOfCards < 2 ? 2 : Math.floor(numOfCards);
      let width = (tarotContainerWidth - 15 * (numOfCards - 1)) / numOfCards;

      this.width = width;
      this.numOfCards = numOfCards;
    }
  }

  setScrollYPosition() {
    let yPosition = this.scrollLength.getScrollLength(1);

    if (yPosition != null || yPosition != 0) {

      if (this.isGrid) {
        this.yPosition = yPosition < this.innerHeight ? yPosition : yPosition + this.innerHeight;
        document.getElementById("tarot-container").style.minHeight = this.yPosition - 77 + "px";
      } else {
        this.yPosition = yPosition;

        // NOTE: below is for desktop version
        // it needs to wait for the codex to load first
        // this.yPosition = yPosition < this.innerHeight ? yPosition : yPosition + this.innerHeight;
        // document.getElementById("test").style.minHeight = this.yPosition - 77 + "px";
      }
      
      window.scroll(0, this.yPosition);
    }
  }

  storeScrollYPosition() {
    this.yPosition = document.getElementsByTagName("html")[0].scrollTop;
    this.scrollLength.setScrollLength(1, this.yPosition);
    console.log("stored at: " + this.yPosition)
  }

  async navigate(link: string, element: HTMLElement) {
    if (this.emptyQueue) {
      this.emptyQueue = false;
      this.showGoldOverlay(element);

      // NOTE: MUST WAIT to finish the opacity transition on the Tarot Card
      await new Promise((resolve) => setTimeout(resolve, 350));
      this.router.navigateByUrl(link);
    }
  }

  showGoldOverlay(element: HTMLElement) {
    let overlayDiv: HTMLElement = element.querySelector(".gold-overlay");
    overlayDiv.classList.add("show");
  }

  // ANCHOR: Modal
  // Handles the Layout of the Tarots
  openModal(content) {
    this.activeModal = this.modalService.open(content, { animation: false });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onShowTitle() {
    this.isShowTitle = !this.isShowTitle;
  }

  onGrid() {
    this.isGrid = !this.isGrid;
    this.instantiateTarots();
  }

  onList() {
    this.isGrid = !this.onGrid;
  }
}
