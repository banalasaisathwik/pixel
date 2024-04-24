
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import Image from 'next/image';
import Loading from '~/components/Loading';
import Link from 'next/link';
const Hello = () => {
    const [visitorsCount, setVisitorsCount] = useState(0);
    const router = useRouter();
    const { row, col } = router.query;
    const rowNumber = typeof row === 'string' ? parseInt(row, 10) : undefined;

    const { data: websiteDetails, isLoading, isError } = api.details.retrive.useQuery({
        row: rowNumber ?? 0,
        col: parseInt(col as string, 10)
    });

    const { mutate: updateVisitorsCount , data } = api.details.visitors.useMutation({
        onSuccess: (data) => {
            if (data.visitors !== null) {
                setVisitorsCount(data.visitors);
            }
        },
    });

    useEffect(() => {
        if (websiteDetails?.id && visitorsCount === 0) {
            updateVisitorsCount({ websiteId: websiteDetails.id });
        }
    }, [websiteDetails, visitorsCount, updateVisitorsCount]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-semibold">Loading...</div>
        </div>;
    }

    if (isError) {
        return (
            <div className="mx-auto p-4 cursor-pointer bg-[url('/bg.avif')] bg-cover bg-center w-full min-h-screen">
            <div className="flex justify-center items-center h-screen ">
                <div className="p-8 mt-20 text-center">
                    <h2 className="text-6xl text-white   font-bold mb-4">For Sale!</h2>
                    <p className="text-xl  text-gray-100 my-6">The block has not yet been sold.</p>
                  
                    <Link href={"/buyer/info"} className='text-white cursor-pointer text-xl bg-black p-4'>Want to buy this block ?</Link>
                </div>
            </div>
            </div>
        );

    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="mx-auto p-4 cursor-pointer bg-[url('/bg.avif')] bg-cover bg-center w-full min-h-screen">
            <div className="max-w-7xl mx-auto lg:p-6 mt-44 lg:mt-44 w-full">
                <div className='w-full justify-between flex flex-col lg:flex-row items-center'>
                    <div className='flex flex-col lg:flex-row gap-6  w-full justify-between'>
                        <div className='flex gap-4 lg:gap-10 h-full'>
                            <Image width={100} height={100} className='lg:w-32 lg:h-32 w-20 h-20 object-cover object-center rounded-2xl ' src={websiteDetails?.imageUrl ?? "/"} alt='' />
                            <div className='flex flex-col items-center'>
                                <h1 className='text-3xl lg:text-6xl font-sai my-2 text-white'>
                                    <span className='font-kumar text-yellow-600'>#</span> {websiteDetails?.websiteName}  </h1>
                                <p className='text-2xl hidden lg:block text-white  font-light'>{websiteDetails?.tagline}</p>
                            </div>
                        </div>
                        <p className='text-2xl lg:hidden  text-white  font-light'>{websiteDetails?.tagline}</p>
                        <div className=' flex flex-col lg:flex-row  items-center gap-4'>
                            <div 
                            className=' lg:w-[240px] w-full justify-center text-xl flex  items-center gap-4 font-semibold rounded-md border-2 border-white text-white p-4 '>
                               
                                <p> visits :{data?.visitors}</p>
                            </div>
                            <Link href={websiteDetails?.websiteUrl ?? "/error"} className='text-xl font-semibold w-full lg:w-[200px] text-center rounded-md bg-white text-gray-900 p-4 font-sai'>Visit Website</Link>
                        </div>
                    </div>
                </div>
                <hr className='w-full mt-10 ' />
                <div className='my-10 '>
                    <h1 className='text-white font-sai text-3xl'> what is {websiteDetails?.websiteName} ?</h1>
                    <p className='py-4 text-white text-xl whitespace-pre-line'>
                        {websiteDetails?.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hello;
