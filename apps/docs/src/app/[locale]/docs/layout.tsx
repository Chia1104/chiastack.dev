import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]/docs">) {
  const { locale } = await params;

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <DocsLayout {...baseOptions(locale)} tree={source.pageTree[locale]!}>
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none overflow-x-clip">
        <div className="absolute top-0 xl:right-1/2 right-0 translate-x-1/2 -z-10 -translate-y-1/2 w-5xl h-256 rounded-full bg-purple-500/10 max-md:hidden [--mask:radial-gradient(circle_at_center,red,transparent_69%)] mask-(--mask) [webkit-mask-image:var(--mask)] pointer-events-none" />
        <div className="fixed top-0 xl:right-1/2 right-0 translate-x-1/2 -z-10 -translate-y-1/2 w-5xl h-256 rounded-full bg-purple-500/5 max-md:hidden [--mask:radial-gradient(circle_at_center,red,transparent_69%)] mask-(--mask) [webkit-mask-image:var(--mask)] pointer-events-none" />
        <div className="absolute top-0 xl:right-1/2 right-0 translate-x-1/2 -z-10 h-256 w-5xl bg-grid-lines-xl dark:opacity-80 -translate-y-1/2 max-md:hidden [--mask:radial-gradient(circle_at_center_top,red,transparent)] mask-(--mask) [webkit-mask-image:var(--mask)] -skew-20 pointer-events-none" />
      </div>
      {children}
    </DocsLayout>
  );
}
