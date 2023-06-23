import { style } from '@vanilla-extract/css'

export const styles = {
	header: style({
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '1rem',
	}),
	teas: style({
		display: 'flex',
		flexDirection: 'column',
	}),
	notification: style({
		marginLeft: '4rem',
		marginRight: '2rem',
		display: 'flex',
		alignItems: 'start',
	}),
}
