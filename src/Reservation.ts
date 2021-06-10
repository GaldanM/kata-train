import type Seat from "./Seat";

class Reservation {
  trainId: string;
  seats: Seat[];
  bookingId: string;

  constructor(trainId: string, seats: Seat[], bookingId: string) {
    this.bookingId = bookingId;
    this.seats = seats;
    this.trainId = trainId;
  }
}

export default Reservation;
