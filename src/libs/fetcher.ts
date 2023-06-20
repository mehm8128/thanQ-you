export const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}
