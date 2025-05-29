import createAdminClient from "@/lib/supabase-admin";


export async function getAdminUsers() {
    const supabaseAdmin = await createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) throw new Error(error.message);

    // Get the actual user array
    const users = data?.users || [];

    // Filter users by metadata role
    const adminUsers = users;

    return adminUsers;
}