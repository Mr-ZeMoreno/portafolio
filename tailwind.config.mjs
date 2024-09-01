/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			gridTemplateAreas: {
				'layout-md': [
					'image status',
					'image consola',
				],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.grid-template-areas-md': {
					'grid-template-areas': `
						'image status'
						'image consola'
					`, 'grid-template-rows': '40px auto',
					'grid-template-columns': '60% auto',
					'column-gap': '10px',
					'row-gap': '5px',
				},
			}, ['responsive']);
		},
	],
};
