interface IPageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Page = ({ src, alt, width, height }: IPageProps) => (
  <div className="comic-page">
    <img
      className="comic-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  </div>
);

export default Page;
