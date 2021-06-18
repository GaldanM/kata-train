import TicketOffice from "../../src/TicketOffice";
import TrainServiceTests from "./TrainServiceTests";
import mockedTrains from "./trains.json";

import ReservationRequest from "../../src/ReservationRequest";

describe("ticketOffice tests", () => {
  it.each(["express_2000", "express_1999"])("should book a seat on the train named %s", (trainIdWanted) => {
    const trainService = new TrainServiceTests();
    const reservationRequest = new BuildReservationRequest().withTrainId(trainIdWanted).build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.trainId).toStrictEqual(trainIdWanted);
  });
  it.each([1, 2, 3])("should book %d seats", (numberSeatsToBook) => {
    const trainService = new TrainServiceTests();
    const reservationRequest = new BuildReservationRequest().withSeatCount(numberSeatsToBook).build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.seats).toHaveLength(numberSeatsToBook);
  });
  it("should not book when not enough available seats", () => {
    const trainService = new TrainServiceTests();
    jest.spyOn(trainService, "getTrainData").mockImplementation(() => mockedTrains.oneCoachOneSeat);
    const reservationRequest = new BuildReservationRequest().build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.bookingId).toStrictEqual("");
    expect(reservation.seats).toHaveLength(0);
  });
  it("should not book when 70% or more of overall seats are booked", () => {
    const trainService = new TrainServiceTests();
    jest.spyOn(trainService, "getTrainData").mockImplementation(() => mockedTrains.seventyPercentOverallBooked);
    const reservationRequest = new BuildReservationRequest().build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.bookingId).toStrictEqual("");
    expect(reservation.seats).toHaveLength(0);
  });
  it("should not book when more than 70% or more of a coach seats are booked", () => {
    const trainService = new TrainServiceTests();
    jest.spyOn(trainService, "getTrainData").mockImplementation(() => mockedTrains.seventyPercentCoachBooked);
    const reservationRequest = new BuildReservationRequest().build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.bookingId).toStrictEqual("");
    expect(reservation.seats).toHaveLength(0);
  });
  it("should not book when 70% or more of overall seats will be booked with the new reservation", () => {
    const trainService = new TrainServiceTests();
    jest.spyOn(trainService, "getTrainData").mockImplementation(() => mockedTrains.seventyPercentOverallAlmostBooked);
    const reservationRequest = new BuildReservationRequest().build();

    const reservation = new TicketOffice(trainService).makeReservation(reservationRequest);

    expect(reservation.bookingId).toStrictEqual("");
    expect(reservation.seats).toHaveLength(0);
  });
});

class BuildReservationRequest {
  private trainId = "express_2000";
  private seatCount = 2;

  withTrainId(newTrainId: string): BuildReservationRequest {
    this.trainId = newTrainId;
    return this;
  }
  withSeatCount(value: number): BuildReservationRequest {
    this.seatCount = value;
    return this;
  }

  build(): ReservationRequest {
    return new ReservationRequest(this.trainId, this.seatCount);
  }
}
