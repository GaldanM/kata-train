import type { Train } from "./types";

interface TrainService {
  getTrainData: (trainId: string) => Train;
}

export default TrainService;
