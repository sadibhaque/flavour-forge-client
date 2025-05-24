import React, { Children } from "react";
import { motion } from "motion/react";

const Motion = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default Motion;
