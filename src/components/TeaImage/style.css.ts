import { style } from '@vanilla-extract/css'

export const styles = {
	container: style({}),
	tea: style({
		textAlign: 'center',
		position: 'relative',
	}),
	count: style({
		position: 'absolute',
		bottom: 0,
		right: 0,
		fontSize: '1.5rem',
	}),
}
