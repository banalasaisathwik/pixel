import { tickers } from "../utils/tickers"
import { motion } from 'framer-motion';
import { marquee } from "~/styles/animations";


const TickerTapeItem = (props: { title: any; isLargeSize: any; }) => {
    const { title, isLargeSize } = props

    return (
        <span
            className={`after:content-[''] after:inline-block after:w-4 after:h-4 after:mx-6
                after:bg-no-repeat after:bg-center after:bg-flower after:bg-contain after:align-middle`}>
            {title}
        </span>
    )
}

const Ticker = (props: any) => {


    return (
        <motion.div

            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 1 }}
            whileInView='animate'
            viewport={{ once: true }}
            className={`bottom-0 fixed w-full z-[999] bg-black overflow-hidden text-white font-headingFont text-sm md:text-base py-2
                 font-black uppercase tracking-[0.01em] whitespace-nowrap`}>
            <div className='inline-block min-w-screen animate-marquee'>
                {tickers.map((tick, idx) => (
                    <TickerTapeItem key={idx} title={tick} isLargeSize={undefined} />
                ))}
            </div>
            <div className='inline-block min-w-screen animate-marquee'>
                {tickers.map((tick, idx) => (
                    <TickerTapeItem key={idx} title={tick} isLargeSize={undefined} />
                ))}
            </div>
        </motion.div>
    )
}

export default Ticker
