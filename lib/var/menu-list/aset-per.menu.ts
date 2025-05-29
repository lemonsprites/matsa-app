import { Book } from "lucide-react";

export const AsetPerMenu = {
    title: "Aset dan Persediaan",
    url: '/admin/aset',
    icon: Book,
    items: [
        {
            title: 'Overview',
            url: '/admin/aset/'
        },
        {
            title: 'Buku Aset',
            url: '/admin/aset/buku'
        },
        {
            title: 'Transaksi Aset',
            url: '/admin/aset/trx'
        },
    ],
}