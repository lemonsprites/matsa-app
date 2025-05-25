import AdminContent from '@/components/matsa/admin/admin-content';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAPI } from '@/utils/fetcher';
import { Ellipsis } from 'lucide-react';
import { NextPage } from 'next';

interface Props { }


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const ManagePage: NextPage<Props> = async ({ }) => {
    const promisePegawai = await fetchAPI(`${baseUrl}/api/pegawai/`)

    const pegawai = await promisePegawai().json();

    return (
        <AdminContent title="Manage Pegawai">
            <Table>
                <TableCaption>Daftar Pegawai Satuan Kerja Madrasah Tsanawiyah Negeri 1 Ciamis.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>N I P</TableHead>
                        <TableHead>Peg ID</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pegawai.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell >
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{item.nama}</TableCell>
                            <TableCell>{item.nip}</TableCell>
                            <TableCell>{item.peg_id}</TableCell>
                            <TableCell className="text-right">{item.jenis_peg}</TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline"><Ellipsis /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[100px]" align='end'>
                                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup >
                                            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AdminContent>
    )
}

export default ManagePage