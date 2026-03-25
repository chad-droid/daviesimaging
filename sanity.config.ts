"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";
import { projectId, dataset } from "@/sanity/env";

export default defineConfig({
  name: "dig-blog",
  title: "DIG Blog",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
