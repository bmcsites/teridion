import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-se-list',
  templateUrl: './se-list.component.html',
  styleUrls: ['./se-list.component.scss']
})
export class SeListComponent implements OnInit{
  people: any;
  data: any;
  @Output() valueChange = new EventEmitter();
  searchQ: string;

  constructor(private httpService: HttpService) {
    this.searchQ = '';
  }

  ngOnInit() {
    this.httpService.getpeaple().subscribe((data: any[]) => {
        if (data) {
          this.data = data;
          this.people = data.sort(this.sortData);
          console.log(this.people);
        }
      },
      err => {
        console.log('err:::', err);
      });
  }

  sortData(a, b) {
    if (a.lname < b.lname) {
      return -1;
    }
    if (a.lname > b.lname) {
      return 1;
    }
    return 0;
  }

  searchData(searchTag) {
    if (searchTag.length < 2 || !searchTag) {
      console.log('search doesnt meet req');
      this.people = this.data.sort(this.sortData);
    } else {
      this.people = this.people.filter( person => person.name.toLowerCase().startsWith(searchTag) || person.lname.toLowerCase().startsWith(searchTag));
    }
  }

  showInfo(q: any) {
    this.valueChange.emit(q);
  }

}
