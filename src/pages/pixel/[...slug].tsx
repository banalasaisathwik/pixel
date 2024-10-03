import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '~/components/Loading';
import Link from 'next/link';
import { api } from '~/utils/api';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { db } from '~/server/db';
import { createContext } from '~/server/api/context';

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch the row and col combinations from your database to create paths
    const coordinates = await db.coordinate.findMany({
        select: {
            x: true,
            y: true,
        },
    });

    const paths = coordinates.map((coordinate) => ({
        params: {
            slug: [String(coordinate.x), String(coordinate.y)], // Pass as array
        },
    }));

    return {
        paths,
        fallback: 'blocking', // Will show the loading state if the path is not generated yet
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params ?? {};

    if (!slug || slug.length !== 2) {
        return { notFound: true };
    }

    const [row, col] = slug;

    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: await createContext(),
        transformer: superjson,
    });

    // Prefetch the website details based on row and col
    await helpers.details.retrive.prefetch({
        row: parseInt(row ?? "0", 10),
        col: parseInt(col ?? "0", 10),
    });

    return {
        props: {
            trpcState: helpers.dehydrate(),
            row,
            col,
        },
    };
};

const Hello = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { row, col } = props;
    const rowNumber = parseInt(row as string, 10); // Assert row as string
    const colNumber = parseInt(col as string, 10); // Assert col as string
    const [visitorsCount, setVisitorsCount] = useState(0);

    const { data: websiteDetails, isLoading, isError } = api.details.retrive.useQuery({
        row: rowNumber,
        col: colNumber,
    });

    const { mutate: updateVisitorsCount, data } = api.details.visitors.useMutation({
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

    if (rowNumber === 0 && colNumber === 0) {
        return (
            <div className="mx-auto p-4 cursor-pointer bg-cover bg-center w-full min-h-screen">
                <div className="p-8 mt-20 text-center">
                    <p className="text-xl mt-20 text-gray-100">To use this feature, switch to the  <span className='text-red-400'>desktop site 👇</span>.</p>
                    <Image src="mobile.jpg" alt="image" width={300} height={300} className="mx-auto" />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto p-4 cursor-pointer bg-cover bg-center w-full min-h-screen">
                <div className="flex justify-center items-center h-screen">
                    <div className="p-8 mt-20 text-center">
                        <h2 className="text-6xl text-white font-bold mb-4">{"For sale! If it's on the map."}</h2>
                        <p className="text-xl text-gray-100 my-6">This space has not yet been sold.</p>
                        <Link href={"/buyer/info"} className='text-white cursor-pointer text-xl bg-black p-4'>Want to buy this space?</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto p-4 cursor-pointer bg-cover bg-center w-full min-h-screen">
            <div className="max-w-7xl mx-auto lg:p-6 mt-44 w-full">
                <div className='w-full justify-between flex flex-col lg:flex-row items-center'>
                    <div className='flex flex-col lg:flex-row gap-6 w-full justify-between'>
                        <div className='flex gap-4 lg:gap-10 h-full'>
                            <Image width={100} height={100} className='lg:w-32 lg:h-32 w-20 h-20 object-contain object-center rounded-2xl'
                                src={websiteDetails?.imageUrl ?? "/"} alt='' />
                            <div className='flex flex-col items-center'>
                                <h1 className='text-3xl lg:text-6xl font-sai my-2 text-white'>
                                    <span className='font-kumar text-yellow-600'>#</span> {websiteDetails?.websiteName}
                                </h1>
                                <p className='text-2xl hidden lg:block text-white font-light'>{websiteDetails?.tagline}</p>
                            </div>
                        </div>
                        <p className='text-2xl lg:hidden text-white font-light'>{websiteDetails?.tagline}</p>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className='lg:w-[240px] w-full justify-center text-xl flex items-center gap-4 font-semibold rounded-md border-2 border-white text-white p-4'>
                                <p>Visits: {data?.visitors}</p>
                            </div>
                            <Link href={websiteDetails?.websiteUrl ?? "/error"} className='text-xl font-semibold w-full lg:w-[200px] text-center rounded-md bg-white text-gray-900 p-4 font-sai'>Visit Website</Link>
                        </div>
                    </div>
                </div>
                <hr className='w-full mt-10' />
                <div className='my-10'>
                    <h1 className='text-white font-sai text-3xl'>What is {websiteDetails?.websiteName}?</h1>
                    <p className='py-4 text-white text-xl whitespace-pre-line'>
                        {websiteDetails?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hello;
