
"use client"
import { useParams } from "next/navigation";


export default function EditAdminUserPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Admin User</h1>
      <p className="text-gray-500">Edit form for user ID: {id}</p>
    </div>
  );
}