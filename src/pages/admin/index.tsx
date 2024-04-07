import { useUser } from "@clerk/nextjs";
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

const AdminDashboard: React.FC = () => {
    const { user } = useUser();
    console.log(user?.emailAddresses)
    // Check if user and user.publicMetadata are defined
    if (!user?.publicMetadata) {
        // Handle case where user or user.publicMetadata is not defined
        return <h1>Not authorized</h1>;
    }

    const { role } = user.publicMetadata;

    // If the user does not have the admin role, display a message
    if (role !== "admin") {
        return <h1>Not authorized</h1>;
    }
    console.log(user?.publicMetadata.role)
    const { data, isLoading } = api.admin.notYetUploaded.useQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    // Main content rendering
    return (
        <>
            <h1>You are in the admin dashboard</h1>
            
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index}>
                        <Card data={item} />
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}

export default AdminDashboard;
