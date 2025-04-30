/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useRef } from 'react'

import Top from '@/components/top'
import useIsMobile from '@/components/isMobile'
import Certifications from '@/components/certifications'
import Experience from '@/components/experience'
import Challenges from '@/components/challenges'
import DidYouKnow from '@/components/did-you-know'
import GenerateValue from '@/components/generate-value'
import Skills from '@/components/skills'
import Results from '@/components/results'
import HowToImplement from '@/components/how-to-implement'
import Contact from '@/components/contact'

const Page = () => {

  const [topic, setTopic] = useState('top')

  // Create refs for each section
  const topRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const challengesRef = useRef<HTMLDivElement>(null)
  const didYouKnowRef = useRef<HTMLDivElement>(null)
  const generateValueRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const howToImplementRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const isMobile = useIsMobile();

  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleSection = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, { intersectionRatio: 0, target: { id: '' } });

        // Update the topic based on the visible section
        if (visibleSection.intersectionRatio > 0.5) {
          const sectionId = visibleSection.target.id;
          setTopic(sectionId)
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: [0.1, 0.5, 0.75] // multiple thresholds for better accuracy
      }
    );

    // Observe all section refs
    if (topRef.current) observer.observe(topRef.current);
    if (certificationsRef.current) observer.observe(certificationsRef.current);
    if (experienceRef.current) observer.observe(experienceRef.current);
    if (challengesRef.current) observer.observe(challengesRef.current);
    if (didYouKnowRef.current) observer.observe(didYouKnowRef.current);
    if (generateValueRef.current) observer.observe(generateValueRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (resultsRef.current) observer.observe(resultsRef.current);
    if (howToImplementRef.current) observer.observe(howToImplementRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
      {/*{
        isMobile
          ? <NavbarMobile topic={topic} setTopic={setTopic} />
          : <Navbar topic={topic} setTopic={setTopic} />
      } */}

      <main
        className='w-full flex flex-col gap-[124px] items-center'
        style={{
          scale: isMobile ? 0.7 : 1
        }}
      >
        <Top ref={topRef} />

        {/* <Certifications ref={certificationsRef} />

          <Experience ref={experienceRef} />

          <Challenges ref={challengesRef} />

          <DidYouKnow ref={didYouKnowRef} />

          <GenerateValue ref={generateValueRef} />

          <Skills ref={skillsRef} />

          <Results ref={resultsRef} />

          <HowToImplement ref={howToImplementRef} /> */}

        <Contact ref={contactRef} />
      </main>
    </div>
  );
}

export default Page;