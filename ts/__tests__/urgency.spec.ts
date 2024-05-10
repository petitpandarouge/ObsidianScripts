import { Urgency } from "../src/urgency";

describe("Urgency", () => {
    it("should work", () => {
        let urgency = new Urgency();
      expect(urgency.getScore()).toEqual(12);
    });
  });