import { GRAPHQL_ENDPOINT } from "astro:env/client";
import { createCardMapper } from "./cardMapper.ts";

const batchedData = await fetch(`${GRAPHQL_ENDPOINT}`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
      query: `
      query BatchedQueries($meetupName: String!, $blogName: String!) {
         meetupPosts: posts(where: {categoryName: $meetupName}) {
            nodes {
               id: databaseId
               slug
               title(format: RENDERED)
               excerpt
               eventSettings {
                  eventDate
               }
               author {
                  node {
                     avatar {
                        url
                     }
                     email
                     name
                  }
               }
               content(format: RENDERED)
               featuredImage {
                  node {
                     altText
                     sourceUrl
                     mediaDetails {
                        width
                        height
                        sizes(include: MEDIUM) {
                           height
                           width
                           sourceUrl
                        }
                     }
                  }
               }
            }
         }
         blogPosts: posts(where: {categoryName: $blogName}) {
            nodes {
               id: databaseId
               slug
               title(format: RENDERED)
               excerpt
               date
               author {
                  node {
                     avatar {
                        url
                     }
                     email
                     name
                  }
               }
               content(format: RENDERED)
               featuredImage {
                  node {
                     altText
                     sourceUrl
                     mediaDetails {
                        width
                        height
                        sizes(include: MEDIUM) {
                           height
                           width
                           sourceUrl
                        }
                     }
                  }
               }
            }
         }
         pages: pages {
            nodes {
               id: databaseId
               slug
               title(format: RENDERED)
               content(format: RENDERED)
               featuredImage {
                  node {
                     sourceUrl
                     altText
                     mediaDetails {
                        width
                        height
                     }
                  }
               }
            }
         }
      }
    `,
      variables: {
         blogName: "blog",
         meetupName: "meetups",
      },
   }),
});

const { data } = await batchedData.json();

// Create card mapping functions
const meetupCardMapper = createCardMapper("/events");
const postCardMapper = createCardMapper("/blog");

// Map the data to cards
export const meetupPosts: MeetupResponse[] = data.meetupPosts.nodes;
export const meetupCards = meetupCardMapper(meetupPosts);

export const blogPosts: PostResponse[] = data.blogPosts.nodes;
export const postCards = postCardMapper(blogPosts);

export const pages = data.pages.nodes;
