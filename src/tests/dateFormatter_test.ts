// @deno-types="../declarations.d.ts"

import { assertEquals } from "jsr:@std/assert";
import { extractDate, postDateToDateString } from "../utils/dateFormatter.ts";
import { dummyDate, dummyMeetup, dummyPost, expectedDate } from "./testData.ts";

Deno.test("test date mapping", () => {
   assertEquals(postDateToDateString(dummyDate), expectedDate);
});

Deno.test("test blog post date extraction", () => {
   assertEquals(extractDate(dummyPost), expectedDate);
});

Deno.test("test meetup date extraction", () => {
   assertEquals(extractDate(dummyMeetup), expectedDate);
});
