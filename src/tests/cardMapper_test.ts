// @deno-types="../declarations.d.ts"

import { assertEquals } from "jsr:@std/assert";
import { createCardMapper } from "../utils/cardMapper.ts";
import {
   dummyMeetup,
   dummyPost,
   expectedMeetup,
   expectedPost,
} from "./testData.ts";

const meetupCardMapper = createCardMapper("/events");
const postCardMapper = createCardMapper("/blog");

Deno.test("test meetup card mapping", () => {
   const mappedMeetup = meetupCardMapper([dummyMeetup]);
   assertEquals(mappedMeetup, [expectedMeetup]);
});

Deno.test("test post card mapping", () => {
   const mappedPost = postCardMapper([dummyPost]);
   assertEquals(mappedPost, [expectedPost]);
});
