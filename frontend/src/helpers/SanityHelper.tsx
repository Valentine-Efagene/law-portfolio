import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";

export default class SanityHelper {
  public static urlFor(source: any) {
    return imageUrlBuilder(client).image(source);
  }
}
