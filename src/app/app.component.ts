import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
  public currentPage: number = 0;

  public previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage(this.currentPage);

    }
  }

  public nextPage() {
    this.currentPage++;
    this.updatePage(this.currentPage);
  }

  public updatePage(value: any){
    this.currentPage = value;

  }
}
