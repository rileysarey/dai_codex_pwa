import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() codexPg: boolean = false;

  @Output() onChangeLayout = new EventEmitter<void>();

  private titleSnapshot: any;
  private categorySnapshot: any; 

  constructor(private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.titleSnapshot = this.route.snapshot.paramMap.get("title");
    this.categorySnapshot = this.route.snapshot.paramMap.get("category");
  }

  goBack() {
    if(this.titleSnapshot != null) {
      this.router.navigateByUrl(`/${this.categorySnapshot}`)
    } else {
      this.router.navigateByUrl('')
    }
  }

  changeLayout() {
    this.onChangeLayout.emit();
  }
}
