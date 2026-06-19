import { Component } from '@angular/core';
import { RateLimiterService } from '../../core/services/rate-limiter';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
constructor(
  public rateLimiter:RateLimiterService
){}
}
