type AdminWrapperProps = {
    title: string;
    children: React.ReactNode;
};

const AdminWrapper = ({ title, children }: AdminWrapperProps) => {
    return (
        <div className="matsa-grid">
            <div className="flex justify-between items-center col-span-4">
                <h2 className="text-2xl font-bold mb-4 ">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default AdminWrapper;
