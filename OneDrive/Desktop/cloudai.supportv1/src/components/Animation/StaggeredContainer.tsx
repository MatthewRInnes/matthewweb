
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportAmount?: number;
  once?: boolean;
}

export const StaggeredContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  viewportAmount = 0.1,
  once = true,
}: StaggeredContainerProps) => {
  // Convert React children to array to apply staggered animations
  const childrenArray = React.Children.toArray(children);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: once, amount: viewportAmount }}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
