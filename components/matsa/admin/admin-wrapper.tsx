import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type AdminWrapperProps = {
    title: string;
    children: React.ReactNode;
};

const AdminWrapper = ({ title, children }: AdminWrapperProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Count segments by splitting the pathname on slashes
    const pathSegments = location.pathname.split("/").filter(Boolean); // filter(Boolean) removes empty segments

    // Disable the back button if there's only one segment (root level, like "/admin")
    const canGoBack = pathSegments.length > 3;

    const handleBackClick = () => {
        if (canGoBack) {
            navigate(-1); // Goes back to the previous page
        }
    };
    return (
        <div className="matsa-grid">

            <div className="flex mb-4 items-center col-span-4">
                {canGoBack ? (
                    <Button size="icon" variant="link" onClick={handleBackClick}><ArrowLeft /></Button>

                ) : null}
                <h2 className="text-2xl font-bold ">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default AdminWrapper;
