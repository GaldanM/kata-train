/* eslint-disable class-methods-use-this */
import mockedTrains from "./trains.json";

import type TrainService from "../../src/TrainService";
import type { Train } from "../../src/types";

class TrainServiceTests implements TrainService {
  getTrainData(): Train {
    return mockedTrains.oneCoachNotFulfilled;
  }
}

export default TrainServiceTests;
