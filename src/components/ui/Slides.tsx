import { motion, AnimatePresence } from 'framer-motion';
import { slides } from '../../constants/slides';

interface SliderProps {
    currentSlide: number;
}

export const Slider = ({ currentSlide }: SliderProps) => {
    return (
        <div className="mb-8 flex w-full flex-col space-y-4 lg:mb-0 lg:w-1/2">
            <p className="text-base font-normal text-gray-500">#Hot Sales Today</p>
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[500px] text-3xl font-extrabold leading-tight text-[#4B5320] sm:text-4xl sm:leading-[70px] md:text-5xl lg:text-6xl"
                    dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
                />
            </AnimatePresence>
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-lg font-normal text-gray-500"
                >
                    {slides[currentSlide].subtitle}
                </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                            index === currentSlide ? 'bg-gray-700' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};