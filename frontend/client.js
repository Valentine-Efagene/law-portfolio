import { createClient } from "@sanity/client";

export default createClient({
  projectId: "064mk5bf", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2023-03-19", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});
