import { Injectable ,signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewHistory {
  selectedReview = signal<any | null>(null);
   reviews = signal<any[]>([]);
  constructor() {

  const saved =
    sessionStorage.getItem('reviews');
  if (saved) {
    this.reviews.set(
      JSON.parse(saved)
    );
  }

}
   
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
selectReview(review: any) {
  this.selectedReview.set(review);
}
}
