/* eslint-disable class-methods-use-this */
import type TrainDataService from "../../src/TrainDataService";

class TrainDataServiceDummy implements TrainDataService {
  getFulfillment(): number {
    return 0;
  }
}

export default TrainDataServiceDummy;
