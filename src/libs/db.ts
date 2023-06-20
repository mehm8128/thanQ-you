import { Connection, createConnection } from 'mysql2/promise'

export async function connectDb(): Promise<Connection> {
	try {
		const connection = await createConnection({
			host: process.env.NS_MARIADB_HOSTNAME,
			port: Number(process.env.NS_MARIADB_PORT),
			user: process.env.NS_MARIADB_USER,
			password: process.env.NS_MARIADB_PASSWORD,
			database: process.env.NS_MARIADB_DATABASE,
		})
		return connection
	} catch {
		throw new Error('DB connection failed')
	}
}
