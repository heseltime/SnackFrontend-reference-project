import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Check if the dark theme should be enabled initially
    // You can modify this logic as per your requirement
    //if (/* condition to enable dark theme */) {
    //  this.themeService.toggleTheme();
    //}
  }

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }
}
