import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollLengthService {

  public scrollLength = [
    {page: "category", length: null},
    {page: "tarot", length: null},
    {page: "codex", length: null} 
  ]

  constructor() { }

  getScrollLength(pageIndex: number) {
    return this.scrollLength[pageIndex].length; 
  }

  setScrollLength(pageIndex: number, yPostion: number) {
    this.scrollLength[pageIndex].length = yPostion;
  }
}
