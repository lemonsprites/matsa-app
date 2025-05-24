'use client';

import AdminContent from '@/components/matsa/admin/admin-content';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchRoles } from '@/lib/api/roles';
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '@/lib/api/users'; // Make sure you export these properly
import { ROLETYPE } from '@/lib/enum/role.enum';
import { Role } from '@/lib/interface/role.interface';
import { useEffect, useState } from 'react';

type User = {
  password: string;
  id: string;
  nama: string;
  email: string;
  jenis_profil: string;
  approved: boolean;
  created_at: string;
  roles: string[];
  is_siswa: boolean;
  is_pegawai: boolean;
  is_komite: boolean;
};

const roleLabels: Record<ROLETYPE, string> = {
  [ROLETYPE.LEMBAGA]: 'lembaga',
  [ROLETYPE.GUEST]: 'guest',
  [ROLETYPE.KOMITE]: 'komite',
  [ROLETYPE.SYSTEM]: 'system',
  [ROLETYPE.SISWA]: 'siswa',
};

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [appRoles, setAppRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  // Add these fields in your formData state:
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    email: '',
    jenis_profil: '',       // new
    password: '',    // new, optional if you want admin to set
    roles: [] as string[],
    subtypes: [] as string[],
    approved: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<ROLETYPE[]>([]);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers()
    // console.log(data);
    setUsers(data);
    setLoading(false);
  };

  const loadRoles = async () => {
    setLoading(true);
    const data = await fetchRoles()
    setAppRoles(data)
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const resetForm = () => {
    setFormData({ id: '', nama: '', email: '', jenis_profil: '', password: '', roles: [], subtypes: [], approved: false });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await updateUser(formData.id, {
        nama: formData.nama,
        email: formData.email,
        roles: formData.roles.map((role: any) => role.id),
        jenis_profil: formData.jenis_profil,
        approved: formData.approved,
        // optionally handle password update if provided
        password: formData.password || undefined,
      });
    } else {
      createUser({
        nama: formData.nama,
        email: formData.email,
        roles: formData.roles.map((role: any) => role.id),
        password: formData.password,
      });
    }
    setShowForm(false);
    resetForm();
    await loadUsers();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      await loadUsers();
    }
  };

  const openEdit = (user: User) => {
    setFormData({
      id: user.id,
      nama: user.nama,
      password: user.password,
      jenis_profil: user.jenis_profil,
      email: user.email,
      roles: user.roles,
      subtypes: [
        ...(user.is_siswa ? ['siswa'] : []),
        ...(user.is_pegawai ? ['pegawai'] : []),
        ...(user.is_komite ? ['komite'] : []),
      ],
      approved: user.approved,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <AdminContent title="Manajemen User">
      <div className="flex justify-between items-center mb-4">
        <>_SEARCH_</>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Email</TableHead>
              <TableHead className="px-4 py-2">Roles</TableHead>
              <TableHead className="px-4 py-2">Approved</TableHead>
              <TableHead className="px-4 py-2">Type</TableHead>
              <TableHead className="px-4 py-2">Created</TableHead>
              <TableHead className="px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const types = [
                user.is_siswa && "Siswa",
                user.is_pegawai && "Pegawai",
                user.is_komite && "Komite",
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-2">{user.nama}</TableCell>
                  <TableCell className="px-4 py-2">{user.email}</TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length !== 0 ? (
                        user.roles.map((r: any) => (
                          <Badge key={r.id} variant="outline" className="text-xs">
                            {r.name}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary">Role Belum Diatur</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {user.approved ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-2">{user.jenis_profil || "-"}</TableCell>
                  <TableCell className="px-4 py-2">
                    {Intl.DateTimeFormat('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(user.created_at))}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      {user.jenis_profil !== 'system' ? <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button> : ""

                      }
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {showForm && (
        <div className="mt-6 bg-gray-50 p-4 rounded border text-xs">
          <h3 className="font-semibold text-lg mb-2">
            {isEditing ? 'Edit User' : 'Create New User'}
          </h3>

          <input
            className="w-full border px-3 py-2 mb-2 rounded"
            placeholder="Name"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          />

          <input
            type="email"
            required
            className="w-full border px-3 py-2 mb-2 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            required={!isEditing}  // required only on create
            className="w-full border px-3 py-2 mb-2 rounded"
            placeholder={isEditing ? 'Leave blank to keep current password' : 'Password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <label className="block text-sm font-medium">Roles</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {appRoles.map((role) => (
              <label key={role.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.roles.some((r: any) => r.id === role.id)}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      roles: e.target.checked
                        ? [...prev.roles, { id: role.id, name: role.name }]               // add role.id only
                        : prev.roles.filter((r: any) => r.id !== role.id),  // remove role.id
                    }))
                  }
                />
                {role.name}
              </label>
            ))}
          </div>


          <label className="block text-sm font-medium">Jenis Akun</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {Object.values(ROLETYPE).map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.jenis_profil === role}
                  onChange={(e) => {
                    if (formData.jenis_profil === role) {
                      setFormData(prev => ({ ...prev, jenis_profil: '' })); // uncheck
                    } else {
                      setFormData(prev => ({ ...prev, jenis_profil: role })); // select new
                    }
                  }}
                />
                <span>{roleLabels[role]}</span>
              </label>
            ))}


          </div>





          <label className="block text-sm font-medium">Konfirmasi Langsung</label>
          {isEditing && (
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={formData.approved}
                onChange={(e) =>
                  setFormData({ ...formData, approved: e.target.checked })
                }
              />
              Approved
            </label>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </AdminContent>
  );
}
