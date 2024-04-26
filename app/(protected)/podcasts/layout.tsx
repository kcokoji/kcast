export default async function PodcastsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen">{children}</section>;
}
