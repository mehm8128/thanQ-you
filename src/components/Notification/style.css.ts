import { globalStyle, style } from '@vanilla-extract/css'

export const styles = {
	dropdown: style({
		padding: '1rem 0 1rem 0.5rem',
	}),
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
		padding: '0.5rem 1rem',
		selectors: {
			'&[data-unread="true"]': {
				backgroundColor: '#f5f5f5',
			},
		},
	}),
	message: style({}),
	createdAt: style({
		color: '#999',
	}),
}

globalStyle(`${styles.unreadList} > * + *`, {
	marginTop: '1rem',
})
