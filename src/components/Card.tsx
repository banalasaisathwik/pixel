import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import Link from "next/link";
import router from "next/router";

interface Website {
    id: string;
    imageUrl: string;
}

interface Coordinate {
    id: string;
    x: number;
    y: number;
    pixelId: string;
}

interface DataItem {
    website: Website | null;
    coordinates: Coordinate[];
}

const Card: React.FC<{ data: DataItem }> = ({ data }) => {
    const [btnDisabled, setBtnDisabled] = useState(false);

    const update = api.admin.updatedPxl.useMutation({
        onSuccess: () => {
            setBtnDisabled(false);
            toast.success("Upload successful");
            setTimeout(() => {
                void router.push('/buyer/home');
            }, 2000);
        },
        onError: (error) => {
            console.error('Error while uploading:', error);
            setBtnDisabled(false);
            toast.error("Upload failed");
        }
    });

    function handleUpload() {
        const isConfirmed = window.confirm(`Are you sure you want make upload?`);
        if (isConfirmed) {
            setBtnDisabled(true);
            if (data.website?.id) {
                update.mutate({ id: data.website.id });
            } else {
                console.error("Website ID is undefined");
                // Handle the case where website ID is undefined, such as showing an error message to the user
            }
     }
    }

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4">
            {data.website && (
                <div className="mb-2">
                    <Link href={data.website.imageUrl}>image link</Link>
                </div>
            )}
            <div>
                {data.coordinates.map((coordinate, index) => (
                    <div key={index} className="mb-2">
                        <p>X: {coordinate.x}, Y: {coordinate.y}, Pixel ID: {coordinate.pixelId}</p>
                    </div>
                ))}
            </div>
            <button
                className="px-4 py-2 rounded bg-blue-500 text-white"
                onClick={handleUpload}
                disabled={btnDisabled}
            >
               make it as Uploaded
            </button>
        </div>
    );
}

export default Card;
