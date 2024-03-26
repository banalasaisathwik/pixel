import { useUser } from "@clerk/nextjs";
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";



const AdminDashboard: React.FC = () => {
    const { user } = useUser();

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

    const { data,isLoading } = api.admin.notYetUploaded.useQuery();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <h1>This is the admin dashboard</h1>
            <p>This page is restricted to users with the &apos;admin&apos; role.</p>
            {data?.map((item, index) => (
                <div key={index}>
                    <Card data={item} />
                </div>
            ))}
        </>
    );
}

export default AdminDashboard;
