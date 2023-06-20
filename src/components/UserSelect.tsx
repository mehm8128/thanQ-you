import { styles } from '@/app/style.css'

import { User } from '@/model/user'

interface Props {
	users: User[]
}
export default function UserSelect({ users }: Props) {
	return <div className={styles.container}></div>
}
