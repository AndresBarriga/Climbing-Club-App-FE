
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';



const AppBanner = () => {
    return (

        <div>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            >
                <section className="relative bg-contain bg-no-repeat bg-right">
                    <div
                        style={{
                            backgroundImage: 'url(https://i.ibb.co/LSRTBJs/f8596fee-f2af-4da3-a85a-d50fb5bd96cc.jpg)',
                            opacity: '0.6',

                        }}
                        className="absolute inset-0"
                    ></div>

                    <div
                        className="absolute inset-0 bg-black opacity-25"
                    ></div>

                    <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                            <Paper className="bg-black opacity-15 custom-paper">

                                <h1 className="text-3xl font-extrabold sm:text-5xl p-6">
                                    Elevate your
                                    <strong className="block font-extrabold text-green-800">
                                        Climbing Experience
                                    </strong>
                                    any time, anywhere
                                </h1>

                                <p className="mt-4 max-w-lg sm:text-xl/relaxed ">
                                    Are you ready to <strong className="font-extrabold text-green-700">take your climbing journey </strong> to new heights? Our climbing app is your key to reaching the summit of your <strong className="font-bold text-green-700">climbing goals.</strong> We offer the most comprehensive and flexible climbing experience, <strong className="font-bold text-green-700">all in one convenient membership.</strong>
                                </p>

                            </Paper>
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">

                                <a
                                    href="/auth"
                                    className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                                >
                                    GET STARTED
                                </a>

                                <a
                                    href="/pricing"
                                    className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-green-700 shadow hover:bg-green-700 hover:text-white focus:outline-none focus:ring active:text-white sm:w-auto"
                                >
                                    LEARN MORE
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <motion.div
                    initial={{ opacity: 0, y: -180 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
                    className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"
                ></motion.div>
            </motion.section>
        </div>
    );
};

export default AppBanner;