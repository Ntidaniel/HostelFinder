/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Disable RSC cache temporarily
      // (remove after 15.4.7+ fixes this)
      serverComponentsExternalPackages: [],
    },
  }
  
  export default nextConfig