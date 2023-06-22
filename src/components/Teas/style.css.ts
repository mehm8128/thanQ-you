import { style } from '@vanilla-extract/css'

export const styles = {
	container: style({
		display: 'flex',
		flexDirection: 'column',
		gap: '3rem',
	}),
	teas: style({
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	}),
	tea: style({}),
	total: style({}),
}
