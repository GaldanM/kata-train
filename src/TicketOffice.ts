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
    const train = this.trainDataService.getTrainData(request.trainId);

    const coachWithEnoughAvailableSeats = pickCoachWithEnoughAvailableSeats(train, request.seatCount);

    if (!coachWithEnoughAvailableSeats) {
      return new Reservation(request.trainId, [], "");
    }

    const seatsToReserve = coachWithEnoughAvailableSeats.seats.slice(0, request.seatCount);

    return new Reservation(request.trainId, seatsToReserve, "foobar");
  }
}

function pickCoachWithEnoughAvailableSeats(train: Train, seatCount: number): Coach {
  const [coachWithEnoughAvailableSeats] = train.coaches.filter((coach) => {
    const availableSeats = coach.seats.filter((seat) => seat.bookingReference === "");

    return availableSeats.length >= seatCount;
  });

  return coachWithEnoughAvailableSeats;
}

export default TicketOffice;
