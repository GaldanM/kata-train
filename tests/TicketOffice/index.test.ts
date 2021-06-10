import TicketOffice from "../../src/TicketOffice";
import TrainDataServiceDummy from "./TrainDataServiceDummy";

import type ReservationRequest from "../../src/ReservationRequest";

class MakeReservationRequest {
  private trainId = "express_2000";
  private seatCount = 2;

  withTrainId(newTrainId: string): MakeReservationRequest {
    this.trainId = newTrainId;
    return this;
  }
  withSeatCount(value: number): MakeReservationRequest {
    this.seatCount = value;
    return this;
  }

  make(): ReservationRequest {
    return {
      trainId: this.trainId,
      seatCount: this.seatCount,
    };
  }
}

describe("ticketOffice tests", () => {
  it.each(["express_2000", "express_1999"])("should book a seat on the train named %s", (trainIdWanted) => {
    const trainDataService = new TrainDataServiceDummy();
    const reservationRequest = new MakeReservationRequest().withTrainId(trainIdWanted).make();

    const reservation = new TicketOffice(trainDataService).makeReservation(reservationRequest);

    expect(reservation.trainId).toStrictEqual(trainIdWanted);
  });
  it.each([1, 2, 3])("should book %d seats", (numberSeatsToBook) => {
    const trainDataService = new TrainDataServiceDummy();
    const reservationRequest = new MakeReservationRequest().withSeatCount(numberSeatsToBook).make();

    const reservation = new TicketOffice(trainDataService).makeReservation(reservationRequest);

    expect(reservation.seats).toHaveLength(numberSeatsToBook);
  });
  it("should not book a seat on train filled > 70%", () => {
    const trainDataService = new TrainDataServiceDummy();
    jest.spyOn(trainDataService, "getFulfillment").mockImplementation(() => 80);
    const reservationRequest = new MakeReservationRequest().make();

    const reservation = new TicketOffice(trainDataService).makeReservation(reservationRequest);

    expect(reservation.bookingId).toStrictEqual("");
    expect(reservation.seats).toHaveLength(0);
  });
});
