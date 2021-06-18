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

    const isTrainBooked = checkIfTrainIsBooked(train);

    if (isTrainBooked) {
      return new Reservation(request.trainId, [], "");
    }

    const coachWithEnoughAvailableSeats = pickCoachWithEnoughAvailableSeats(train, request.seatCount);

    if (!coachWithEnoughAvailableSeats) {
      return new Reservation(request.trainId, [], "");
    }

    const seatsToReserve = coachWithEnoughAvailableSeats.seats.slice(0, request.seatCount);

    return new Reservation(request.trainId, seatsToReserve, "foobar");
  }
}

function checkIfTrainIsBooked(train: Train): boolean {
  const { bookedSeats, totalSeats } = train.coaches.reduce(
    (acc, current) => ({
      bookedSeats: acc.bookedSeats + current.seats.filter((seat) => seat.bookingReference !== "").length,
      totalSeats: acc.totalSeats + current.seats.length,
    }),
    { bookedSeats: 0, totalSeats: 0 }
  );

  return (bookedSeats / totalSeats) * 100 >= 70;
}

function pickCoachWithEnoughAvailableSeats(train: Train, seatCount: number): Coach | undefined {
  const [coachWithEnoughAvailableSeats] = train.coaches.filter((coach) => {
    const availableSeatsCount = coach.seats.filter((seat) => seat.bookingReference === "").length;

    const isThereEnoughSeats = availableSeatsCount >= seatCount;
    const isCoachBooked = ((coach.seats.length - availableSeatsCount) / coach.seats.length) * 100 >= 70;

    return isThereEnoughSeats && !isCoachBooked;
  });

  return coachWithEnoughAvailableSeats;
}

export default TicketOffice;
