import { Component } from '@angular/core';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { 
	constructor(public meta: MetadataService) { }
}
