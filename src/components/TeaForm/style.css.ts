import { style } from '@vanilla-extract/css'

export const styles = {
	container: style({
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		width: '40%',
		margin: '0 auto',
	}),
	addTeaButton: style({
		textAlign: 'right',
	}),
}
