class Seat {
  coach: string;
  seatNumber: number;

  constructor(coach: string, seatNumber: number) {
    this.seatNumber = seatNumber;
    this.coach = coach;
  }

  equals(seat: Seat): boolean {
    return this.coach === seat.coach && this.seatNumber === seat.seatNumber;
  }
}

export default Seat;
