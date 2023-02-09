interface IMeta {
  title: string;
  description: string;
  slug: string;
  timeString: string;
}

const Meta = ({ title, description, slug, timeString }: IMeta) => (
  <>
    <title>{title}</title>
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
      crossOrigin="true"
    />
    <link rel="canonical" href={`https://www.mojstrip.com/${slug}`} />
    <meta name="description" content={description} />
    <meta property="og:type" content={slug !== "" ? "article" : "website"} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="MojStrip časopis" />
    <meta
      property="article:author"
      content="https://www.facebook.com/mojstrip"
    />
    <meta property="article:section" content="Arts & Entertainment" />
    <meta property="article:published_time" content={timeString} />
    {/* <meta */}
    {/*   property="og:image" */}
    {/*   content="https://smashingmagazine.com/images/smashing-homepage.png" */}
    {/* /> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />
    {/* <meta */}
    {/*   name="twitter:image" */}
    {/*   content="https://smashingmagazine.com/images/smashing-homepage.png" */}
    {/* /> */}
  </>
);

export default Meta;
