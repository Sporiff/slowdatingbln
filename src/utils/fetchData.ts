import { DateFormatter } from "./DateFormatter.ts";
import { CardMapper } from "./CardMapper.ts";
import { GRAPHQL_ENDPOINT } from "astro:env/client";

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
const meetupCardMapper = new CardMapper("/events", DateFormatter.extractDate);
const postCardMapper = new CardMapper("/blog", DateFormatter.extractDate);

export const meetupPosts: MeetupResponse[] = data.meetupPosts.nodes;
export const meetupCards = meetupCardMapper.mapResponseToCards(meetupPosts);

export const blogPosts: PostResponse[] = data.blogPosts.nodes;
export const postCards = postCardMapper.mapResponseToCards(blogPosts);

export const pages = data.pages.nodes;
