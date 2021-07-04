import Reservation from "./Reservation";

import type ReservationRequest from "./ReservationRequest";
import type TrainService from "./TrainService";
import type { Coach, Train } from "./types";

class TicketOffice {
  private readonly trainDataService: TrainService;

  constructor(trainDataService: TrainService) {
    this.trainDataService = trainDataService;
  }

  makeReservation(request: ReservationRequest): Reservation {
    this.trainDataService.getTrainData(request.trainId);

    const isTrainBooked = this.checkIfTrainIsBooked(request.seatCount);

    if (isTrainBooked) {
      return new Reservation(request.trainId, [], "");
    }

    const coachWithEnoughAvailableSeats = this.trainDataService.getCoachWithEnoughAvailableSeats(request.seatCount);

    if (!coachWithEnoughAvailableSeats) {
      return new Reservation(request.trainId, [], "");
    }

    const seatsToReserve = coachWithEnoughAvailableSeats.seats.slice(0, request.seatCount);

    return new Reservation(request.trainId, seatsToReserve, "foobar");
  }

  checkIfTrainIsBooked(reservationSeatCount: number): boolean {
    const { bookedSeats, totalSeats } = this.trainDataService.getTrainStatus();

    return ((bookedSeats + reservationSeatCount) / totalSeats) * 100 >= 70;
  }
}

export default TicketOffice;
