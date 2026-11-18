import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "5xi4v6mr",
    dataset: "production",
  },
  // Hosted Studio at dig-blog.sanity.studio. Pinned so `sanity deploy`
  // updates it instead of prompting for (or creating) a new hostname.
  deployment: { appId: "jeo8qpcu5p0spg6jt38noozd" },
});
