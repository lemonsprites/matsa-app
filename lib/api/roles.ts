

export async function fetchRoles() {
    const roles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`);
    return roles.json();
}