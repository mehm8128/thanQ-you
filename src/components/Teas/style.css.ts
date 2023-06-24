import { style } from '@vanilla-extract/css'

export const styles = {
	container: style({
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
	}),
	teaContainer: style({
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	}),
	tea: style({}),
	total: style({}),
}
