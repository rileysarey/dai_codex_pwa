import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-codex",
  templateUrl: "codex.component.html",
  styleUrls: ["codex.component.scss"],
})
export class CodexComponent implements OnInit {
  public codexText: string;
  public title: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    window.scroll(0,0);
    window.scrollTo(0,0)
    let category = this.route.snapshot.paramMap.get("category");
    let codexFilename = this.route.snapshot.paramMap.get("title");

    import(
      `!raw-loader!./../../assets/codex/${category}/${codexFilename}.md`
    ).then((data) => {
      let lines = data.default.split("\n");

      this.title = this.titleHtml(lines);
      this.codexText = this.textHtml(lines);
    });
  }

  titleHtml(lines: string[]): string {
    let words = lines[0].split(" ");
    let html = words.join(" ");
    let title = html.substring(21, html.length - 5)
    return title;
  }

  textHtml(lines: string[]) {
    let editedLines = lines.splice(1, lines.length - 1);

    return editedLines.join("");
  }
}
