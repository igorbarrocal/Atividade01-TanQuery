export async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}