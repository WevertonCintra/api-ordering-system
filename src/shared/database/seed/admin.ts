import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  const id = uuid()
  const password = await hash(process.env.APP_PASSWORD, 8)

  await connection.query(
    `INSERT INTO USERS(id, name, password, "admin", "manager", created_at, updated_at) 
      values('${id}', 'admin', '${password}', true, true, 'now()', 'now()')
    `
  )

  await connection.close()
}

create().then(() => console.log('User admin created!'))
