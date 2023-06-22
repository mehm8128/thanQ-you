import { style } from '@vanilla-extract/css'

export const styles = {
	container: style({}),
	tea: style({
		textAlign: 'center',
		position: 'relative',
	}),
	pot: style({
		position: 'absolute',
		top: 0,
		right: 200,
	}),
}
