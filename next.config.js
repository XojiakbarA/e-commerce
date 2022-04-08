// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['127.0.0.1']
//   }
// }
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1']
  }
})