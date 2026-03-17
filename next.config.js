/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from an env-provided host or fallback to the local WP hostname
    domains: [
      process.env.WP_IMAGE_DOMAIN ||
        process.env.WP_IMAGES_URL ||
        "hot-dang-homes-course.local",
    ],
  },
};

module.exports = nextConfig;
