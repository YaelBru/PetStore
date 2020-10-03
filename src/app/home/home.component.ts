import { Component, OnInit } from '@angular/core';
import { Testimony } from './testimony';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //ngb Carousel
  showNavigationArrows = true;
  pauseOnHover = true;
  showNavigationIndicators = true;

  //Mock testimonies
  testimonies: Testimony[] = [
    {
      name: 'Mellisa Griffin',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
    },
    {
      name: 'Ricky Fisher',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      name: 'Ken Davis',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      name: 'Robert Steward',
      content: 'Libero volutpat sed cras ornare arcu dui. Duis ut diam quam nulla porttitor massa id neque aliquam. Morbi tristique senectus et netus. Eget lorem dolor sed viverra ipsum nunc. Morbi tristique senectus et netus et malesuada fames ac turpis.'
    },
    {
      name: 'Kevin OLeary',
      content: 'Sit amet luctus venenatis lectus magna. Risus pretium quam vulputate dignissim suspendisse in est ante in. Quis auctor elit sed vulputate mi sit. Semper feugiat nibh sed pulvinar.'
    },
    {
      name: 'Mark Kuban',
      content: 'Imperdiet proin fermentum leo vel. Tortor condimentum lacinia quis vel.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
