import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn:false so a publish in Studio shows up as soon as the page
  // revalidates. With the CDN on, Sanity's cache sat in front of Next's ISR
  // and the two delays stacked, so newly published posts could stay invisible
  // well past the 60s revalidate window.
  //
  // This is not a per-visitor cost: every fetch runs inside an ISR render, so
  // the site hits Sanity once per revalidation window, not once per request.
  useCdn: false,
});
