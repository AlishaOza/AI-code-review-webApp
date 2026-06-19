import { Injectable ,signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewHistory {
  constructor() {

  const saved =
    sessionStorage.getItem('reviews');

  if (saved) {
    this.reviews.set(
      JSON.parse(saved)
    );
  }

}
    reviews = signal<any[]>([]);
    addReview(review: any) {

  const updated = [
    review,
    ...this.reviews()
  ].slice(0, 5);

  this.reviews.set(updated);

  sessionStorage.setItem(
    'reviews',
    JSON.stringify(updated)
  );
}
}
