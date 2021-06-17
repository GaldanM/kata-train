export interface Train {
  coaches: Coach[];
}

export interface Coach {
  name: string;
  seats: Seat[];
}

interface Seat {
  seatNumber: string;
  bookingReference: string;
}
