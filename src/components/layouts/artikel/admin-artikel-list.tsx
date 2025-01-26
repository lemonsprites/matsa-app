import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import supabase from "@/lib/supabase-client";
import { Edit, ExternalLink, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  TooltipProvider
} from "@/components/ui/tooltip";

type Artikel = {
  id: number;
  title: string;
  content: string;
  author_id: string;
  author: string;  // Display name of the author
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
  status: number;
};

const AdminArtikelList: React.FC = () => {
  const [posts, setPosts] = useState<Artikel[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('tb_artikel')
        .select('id, title, content, created_at, author_id, thumbnail_url, status, user_profiles(display_name)') // Join with user_profiles table
        .eq('status', 1); // If you want to fetch only active posts

      if (error) {
        console.error('Error fetching posts:', error.message);
        return;
      }

      // Assuming user_profiles returns an array of user profile data
      const postsWithAuthors = data.map((article: any) => ({
        ...article,
        author: article.user_profiles ? article.user_profiles.display_name : "Unknown", // Safely handle missing author
      }));

      setPosts(postsWithAuthors);
    };

    fetchPosts();
  }, []);

  const handleDelete = (id: number) => {
    console.log(`Deleting article with ID: ${id}`);
    // Add deletion logic here (e.g., API call)
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Articles</h1>
        <Link to="/admin/artikel/tambah">
          <Button>Create New Article</Button>
        </Link>
      </div>

      <Table className="min-w-full border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold text-left">#</TableCell>
            <TableCell className="font-semibold text-left">Title</TableCell>
            <TableCell className="font-semibold text-left">Author</TableCell>
            <TableCell className="font-semibold text-left">Published At</TableCell>
            <TableCell className="font-semibold text-left">Comments</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TooltipProvider>






            {posts.map((article, index) => (

              <TableRow key={article.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-xs truncate" title={article.title}>
                  {article.title}
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>{article.created_at}</TableCell>
                <TableCell>{article.updated_at}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Link to={`/admin/artikel/${article.id}/edit`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </Button>
                  <Link to={`/artikel/${article.id}`}>
                    <Button variant="default" size="sm" className="flex items-center gap-1">
                      Lihat
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>


            ))}
          </TooltipProvider>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminArtikelList;
