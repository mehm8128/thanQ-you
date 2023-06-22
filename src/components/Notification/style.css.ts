import { globalStyle, style } from '@vanilla-extract/css'

export const styles = {
	container: style({}),
	unreadList: style({
		listStyle: 'none',
		padding: 0,
	}),
	unreadItem: style({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '0.5rem',
	}),
	message: style({}),
	createdAt: style({
		color: '#999',
	}),
}

globalStyle(`${styles.unreadList} > * + *`, {
	marginTop: '1rem',
})
