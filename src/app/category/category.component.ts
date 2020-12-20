import { Component, OnInit } from "@angular/core";
import { Categories } from "../models/categories";


@Component({
  selector: "app-category",
  templateUrl: "category.component.html",
  styleUrls: ["category.component.scss"],
})
export class CategoryComponent implements OnInit {
  categories = Categories;

  constructor() {}

  ngOnInit(): void {
  }

  onClick(routeName: string) {
    console.log(routeName);
    
  }
}


