import Link from "next/link";
import Image from 'next/image';


const Hello = () => {

    return (
        <div className="mx-auto p-4 cursor-pointer bg-cover bg-center w-full min-h-screen">
            <div className="p-8 mt-20 text-center">
                <p className="text-xl mt-20 text-gray-100">To use this feature, switch to the  <span className='text-red-400'>desktop site 👇</span>
                    . After switching, go to the <Link className='text-blue-300 underline' href='/'>home</Link>  page and give it a try.                    </p>
                <Image src="mobile.jpg" alt="image" width="300" height="300" className="mx-auto" />

            </div>
        </div>
    );
}
export default Hello;