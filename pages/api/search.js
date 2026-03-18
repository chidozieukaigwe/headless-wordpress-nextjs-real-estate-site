import client from "client";
import { gql } from "@apollo/client";

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties {
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
          }
        }
      `,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
