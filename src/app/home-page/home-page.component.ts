import { Component } from '@angular/core';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent { 
	constructor(public meta: MetadataService) { }
}
