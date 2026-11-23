export type Poem = {
  slug: string;
  title: string;
  theme: string;
  year: string;
  order: number;
  stanzas: string[][];
};

type PoemFile = Omit<Poem, "slug"> & { slug?: string };

const files = import.meta.glob("../content/poems/*.json", {
  eager: true,
  import: "default",
}) as Record<string, PoemFile>;

const slugFromPath = (path: string) => path.split("/").pop()!.replace(/\.json$/, "");

export const poems: Poem[] = Object.entries(files)
  .map(([path, poem]) => ({ ...poem, slug: poem.slug ?? slugFromPath(path) }))
  .sort((a, b) => a.order - b.order);

export const findPoem = (slug: string): Poem | undefined =>
  poems.find((poem) => poem.slug === slug);
