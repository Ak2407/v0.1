/** @type {import('next').NextConfig} */
const nextConfig = {
  //add hostname

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
