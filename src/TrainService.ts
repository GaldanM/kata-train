import type { Coach } from "./types";

interface TrainService {
  getTrainStatus: () => { bookedSeats: number; totalSeats: number };
  getCoachWithEnoughAvailableSeats: (seatCount: number) => Coach | undefined;
}

export default TrainService;
