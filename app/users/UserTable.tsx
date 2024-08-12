import Link from 'next/link';
import React from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({sortOrder}: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users',
    { next: { revalidate: 10 } }); // this is the data cache from Next.js. This here states that the fetch call
  // is cached (by default even without this line) and the cache is refreshed every 10 seconds.

  // The alternative below shows that when we force no caching, the data is dynamically rendered when you do a build.
  // const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });

  let users: User[] = await res.json();

  function getSortedUsers(so: string): User[] {
    if (so === 'name') return users.sort((a, b) => a.name.localeCompare(b.name));
    if (so === 'email') return users.sort((a, b)=> a.email.localeCompare(b.email));
    return users;
  }

  return (
    <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {getSortedUsers(sortOrder).map((user) => (
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
