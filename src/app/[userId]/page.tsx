import { container, form, header, notification, tea, teas } from './style.css'

export default function UserTea({ params: { userId } }: { params: { userId: string } }) {
	return (
		<div className={container}>
			<div className={header}>
				<div className={teas}></div>
				<div className={notification}></div>
			</div>
			<div className={tea}>
				<div></div>
				<div className={form}></div>
			</div>
		</div>
	)
}
