import { tickers } from "../utils/tickers";
import { motion } from 'framer-motion';

interface TickerTapeItemProps {
    title: string;
    isLargeSize?: boolean;
}

const TickerTapeItem: React.FC<TickerTapeItemProps> = ({ title, isLargeSize }) => {
    return (
        <span
            className={`after:content-[''] after:inline-block after:w-4 after:h-4 after:mx-11
                after:bg-no-repeat after:bg-center after:bg-flower after:bg-contain after:align-middle`}
        >
            {title}
        </span>
    );
}

const Ticker: React.FC = () => {
    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 1 }}
            whileInView='animate'
            viewport={{ once: true }}
            className={`bottom-0 fixed w-full z-[999] bg-black overflow-hidden text-orange-700 font-thin text-sm md:text-base py-0 
                  uppercase tracking-[0.01em] whitespace-nowrap`}
        >
            <div className='inline-block min-w-screen animate-marquee'>
                {tickers.map((tick, idx) => (
                    <TickerTapeItem key={idx} title={tick} />
                ))}
            </div>
            <div className='inline-block min-w-screen animate-marquee'>
                {tickers.map((tick, idx) => (
                    <TickerTapeItem key={idx} title={tick} />
                ))}
            </div>
        </motion.div>
    );
}

export default Ticker;
