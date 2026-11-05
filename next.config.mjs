/** Static export: `next build` writes a plain website to `out/` for GitHub Pages.
 *  Remove `output` if you later host on a server or Vercel and want API routes. */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
