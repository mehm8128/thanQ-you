const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'q.trap.jp',
				port: '',
				pathname: '/api/v3/public/icon/**',
			},
		],
	},
}

module.exports = withVanillaExtract(nextConfig)
