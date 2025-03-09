import AdminBreadcrumb from '@/components/matsa/admin-breadcrumb'
import AdminNavbar from '@/components/matsa/admin/admin-navbar'
import { NextPage } from 'next'
import getConfig from 'next/config'
import { title } from 'process'

interface Props {
    children: React.ReactNode
    title: string
}

const AdminContent: NextPage<Props> = ({ children, title }: Props) => {

    const { publicRuntimeConfig } = getConfig();
    const { __APP_VERSION__ } = publicRuntimeConfig;
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 px-6 py-4 overflow-y-auto mt-5 relative">
                <div className='leading-0'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <AdminBreadcrumb />
                </div>
                <>{children}</>
            </div>
            <div className="flex justify-center text-xs text-muted-foreground p-4 italic ">Versi {__APP_VERSION__} © Copyright {new Date().getFullYear()}, Tim PIDL MTsN 1 Ciamis</div>
        </>
    )
}

export default AdminContent