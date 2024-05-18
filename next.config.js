/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 1,
      static: 1,
    },
  },
  images: {
    //Next 14から非推奨に。
    //https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
    // domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  },
  webpack: (config) => {
		// camel-case style names from css modules
    // https://github.com/vercel/next.js/discussions/11267
		config.module.rules
			.find(({oneOf}) => !!oneOf).oneOf
			.filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
			.reduce((acc, {use}) => acc.concat(use), [])
			.forEach(({options}) => {
				if (options.modules) {
					options.modules.exportLocalsConvention = 'camelCase';
				}
			});

		return config;
	},
}

module.exports = nextConfig
