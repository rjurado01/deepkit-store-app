import { createDB } from "blinkdb";

export class BlinkDbClient {
  readonly db

  constructor() {
    this.db = createDB()
  }
}
