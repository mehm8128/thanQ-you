import { style } from '@vanilla-extract/css'

export const styles = {
	header: style({
		display: 'flex',
		justifyContent: 'space-between',
	}),
	teas: style({
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5rem',
	}),
	notification: style({
		marginLeft: '4rem',
		marginRight: '2rem',
		display: 'flex',
		alignItems: 'start',
	}),
}
