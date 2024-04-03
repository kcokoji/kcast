import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kcast | Free podcast hosting",
    short_name: "Kcast",
    description:
      " Your free podcast hosting destination. Unlimited hosting, easy-to-use interface, seamless distribution, and advanced analytics. Join our vibrant community and start podcasting today!",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
