import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private route: ActivatedRoute) {}

  shouldShowSidebar(): boolean {
    // Get the first segment of the active route
    const firstSegment = this.route.snapshot.firstChild?.url[0]?.path;
    
    // Check if the first segment is not 'login'
    return firstSegment !== 'login';
  }
}
