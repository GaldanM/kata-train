import type TrainService from "../../src/TrainService";
import type { Train } from "../../src/types";

import mockedTrains from "../tests/TicketOffice/trains.json";
import type { Coach } from "./types";

class TrainServiceImpl implements TrainService {
  private readonly train: Train;

  constructor(trainId: string) {
    this.train = mockedTrains.oneCoachNotFulfilled;
  }

  getTrainStatus(): { bookedSeats: number; totalSeats: number } {
    const { bookedSeats, totalSeats } = this.train.coaches.reduce(
      (acc, current) => ({
        bookedSeats: acc.bookedSeats + current.seats.filter((seat) => seat.bookingReference !== "").length,
        totalSeats: acc.totalSeats + current.seats.length,
      }),
      { bookedSeats: 0, totalSeats: 0 }
    );
    return { bookedSeats, totalSeats };
  }

  getCoachWithEnoughAvailableSeats(seatCount: number): Coach | undefined {
    const [coachWithEnoughAvailableSeats] = this.train.coaches.filter((coach) => {
      const availableSeatsCount = coach.seats.filter((seat) => seat.bookingReference === "").length;

      const isThereEnoughSeats = availableSeatsCount >= seatCount;
      const isCoachBooked = ((coach.seats.length - availableSeatsCount) / coach.seats.length) * 100 >= 70;

      return isThereEnoughSeats && !isCoachBooked;
    });

    return coachWithEnoughAvailableSeats;
  }
}
