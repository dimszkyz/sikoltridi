// src/pages/Home.jsx
import React from "react";
import { motion, MotionConfig } from "framer-motion";
import Navbar from "../components/navbar";
import Partfile from "./PartFile";
import logo from "../assets/img/output-onlinepngtools.png";
import PartPlanning from "./PartPlanning";
import PartOrganizing from "./PartOrganizing";
import ScrollTopButton from "../components/ScrollTopButton";

/* ===== Variants yang smooth ===== */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 22,
      mass: 0.9,
    },
  },
};

const imageWrap = {
  hidden: { opacity: 0, x: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 1.1,
    },
  },
};

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="min-h-screen bg-white pt-20 md:pt-24 relative overflow-hidden"
      >
        <Navbar />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white" />

        <MotionConfig reducedMotion="user" transition={{ duration: 0.6 }}>
          <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.h2
                variants={textItem}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-3"
              >
                SIKOLTRIDI
              </motion.h2>

              <motion.p
                variants={textItem}
                className="font-semibold text-blue-600 mb-6 leading-snug
                         text-[32px] sm:text-[36px] md:text-[42px] lg:text-[56px]"
                style={{ whiteSpace: "pre-line" }}
              >
                {`"Sistem informasi\nkolaborasi tripusat\npendidikan"`}
              </motion.p>

              <motion.a
                variants={textItem}
                href="#file"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Mulai
              </motion.a>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center items-center mt-10 lg:mt-0"
              variants={imageWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="relative flex items-center justify-center w-[388px] h-[388px] md:w-[420px] md:h-[420px]">
                <motion.img
                  src={logo}
                  alt="Logo Sikoltridi"
                  className="w-full h-full object-contain md:scale-125 drop-shadow-md"
                  initial={{ scale: 0.98, rotate: 0.2 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                />
              </div>
            </motion.div>
          </div>
        </MotionConfig>
      </section>

      <section id="partfile">
        <Partfile />
      </section>
      <section id="PartPlanning">
        <PartPlanning />
      </section>
      <section id="PartOrganizing">
        <PartOrganizing />
      </section>

      {/* Footer copyright */}
      <footer className="bg-white text-black text-center py-4 mt-10 border-t border-gray-200">
        <p className="text-sm tracking-wide">
          © Copyright <span className="font-bold">APR 2024</span> All Rights Reserved
        </p>
      </footer>
      <ScrollTopButton />
    </>
  );
};

export default Home;
