export type Caption = {
  slug: string;
  text: string;
  context: string;
  tags: string[];
  order: number;
};

type CaptionFile = Omit<Caption, "slug"> & { slug?: string };

const files = import.meta.glob("../content/captions/*.json", {
  eager: true,
  import: "default",
}) as Record<string, CaptionFile>;

const slugFromPath = (path: string) => path.split("/").pop()!.replace(/\.json$/, "");

export const captions: Caption[] = Object.entries(files)
  .map(([path, caption]) => ({ ...caption, slug: caption.slug ?? slugFromPath(path) }))
  .sort((a, b) => b.order - a.order);

export const findCaption = (slug: string): Caption | undefined =>
  captions.find((caption) => caption.slug === slug);
