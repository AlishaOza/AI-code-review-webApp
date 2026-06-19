import {
  Injectable,
  computed,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateLimiterService {

  requests = signal<number[]>([]);

  currentTime = signal(Date.now());

  constructor() {

    setInterval(() => {

      this.currentTime.set(
        Date.now()
      );

    }, 1000);

  }

  canRequest = computed(() => {

    const now = this.currentTime();

    return this.requests()
      .filter(
        time => now - time < 60000
      )
      .length < 3;

  });

  remainingRequests = computed(() => {

    const now = this.currentTime();

    return 3 - this.requests()
      .filter(
        time => now - time < 60000
      )
      .length;

  });

  countdown = computed(() => {

    const now = this.currentTime();

    const activeRequests =
      this.requests()
        .filter(
          time => now - time < 60000
        );

    if (
      activeRequests.length < 3
    ) {
      return 0;
    }

    const oldestRequest =
      activeRequests[0];

    return Math.max(
      0,
      Math.ceil(
        (60000 - (now - oldestRequest))
        / 1000
      )
    );

  });

  addRequest() {

    const now = Date.now();

    const recentRequests =
      this.requests()
        .filter(
          time => now - time < 60000
        );

    this.requests.set([
      ...recentRequests,
      now
    ]);

  }

}