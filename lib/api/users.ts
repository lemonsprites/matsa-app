export async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  return res.json();
}

export async function createUser(payload: {
  nama: string;
  email: string;
  password: string;
  roles: string[];
}) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUser(id: string, updates: Partial<{
  nama: string;
  email: string;
  password: string;
  jenis_profil: string;
  approved: boolean;
  roles: string[];
}>) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteUser(id: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
    method: 'DELETE',
  });
}
