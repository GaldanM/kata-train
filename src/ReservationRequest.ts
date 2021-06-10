class ReservationRequest {
  trainId: string;
  seatCount: number;

  constructor(trainId: string, seatCount: number) {
    this.seatCount = seatCount;
    this.trainId = trainId;
  }
}

export default ReservationRequest;
