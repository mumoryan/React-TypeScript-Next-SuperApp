import React from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users',
    { next: { revalidate: 10 } }); // this is the data cache from Next.js. This here states that the fetch call
  // is cached (by default even without this line) and the cache is refreshed every 10 seconds.

  // The alternative below shows that when we force no caching, the data is dynamically rendered when you do a build.
  // const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });

  const users: User[] = await res.json();

  return (
    <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default UserTable
