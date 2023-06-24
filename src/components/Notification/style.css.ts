import { globalStyle, style } from '@vanilla-extract/css'

export const styles = {
	container: style({}),
	unreadList: style({
		listStyle: 'none',
		paddingRight: '1rem',
		maxHeight: '20rem',
		overflowY: 'auto',
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
