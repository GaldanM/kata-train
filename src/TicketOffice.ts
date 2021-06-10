import type ReservationRequest from "./ReservationRequest";
import Reservation from "./Reservation";
import Seat from "./Seat";
import type TrainDataService from "./TrainDataService";

class TicketOffice {
  private readonly trainDataService: TrainDataService;

  constructor(trainDataService: TrainDataService) {
    this.trainDataService = trainDataService;
  }

  makeReservation(request: ReservationRequest): Reservation {
    if (this.trainDataService.getFulfillment() > 70) {
      return new Reservation(request.trainId, [], "");
    }

    const seats = Array(request.seatCount).map((element, index) => new Seat("A", index));

    return new Reservation(request.trainId, seats, "foobar");
  }
}

export default TicketOffice;
