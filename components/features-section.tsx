"use client";
import { useRef } from "react";
import Container from "./container";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui/features-card";
import {
  CalendarDaysIcon,
  PresentationChartLineIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import H2 from "./ui/typography/h2";
import { useInView, motion } from "framer-motion";
import P from "./ui/typography/p";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Features = [
    {
      name: "Episode Explorer",
      description:
        "Seamlessly navigate through past episodes ,reviling memorable moments and discovering hidden gem  Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: <RectangleStackIcon className="h-8 w-8 text-gray-200" />,
    },
    {
      name: "Audience Insights",
      description:
        "Understand your listeners better than ever. Dive deep into demographics and habits to tailor your content and engagement strategies effectively.",
      icon: <UserGroupIcon className="h-8 w-8 text-gray-200" />,
    },
    {
      name: "Episode Scheduler",
      description:
        "Effortlessly manage your content schedule. Plan, organize, and automate your episode releases with ease, ensuring a consistent presence for your audience.",
      icon: <CalendarDaysIcon className="h-8 w-8 text-gray-200" />,
    },
    {
      name: "Analytics Hub",
      description:
        "Uncover actionable data. Track listener engagement, episode performance, and platform distribution—all in one centralized dashboard.",
      icon: <PresentationChartLineIcon className="h-8 w-8 text-gray-200" />,
    },
  ];

  return (
    <Container className="flex justify-center items-center flex-col gap-6">
      <H2
        isInView={isInView}
        title="The Podcast Platform that Solves Your Problems"
      />
      <P
        title="Designed with content creators like you in mind, we offer a suite of
        features that make podcasting effortless and enjoyable."
        isInView={isInView}
      />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center w-full"
      >
        {Features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView && { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          >
            <GlowingStarsBackgroundCard className="w-full">
              <div className="p-2 bg-gray-900 w-fit rounded-xl">
                {feature.icon}
              </div>
              <GlowingStarsTitle className=" tracking-wide">
                {feature.name}
              </GlowingStarsTitle>
              <GlowingStarsDescription>
                {feature.description}
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
