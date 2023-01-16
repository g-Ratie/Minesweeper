/** @type {import('next').NextConfig} */
const nextConfig = {
  //trueだと,２回useEffectが走ってしまう
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['src/components/', 'src/lib/', 'src/pages/']
  }
}

module.exports = nextConfig
