/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useRef } from 'react'

import Top from '@/components/top'
import useIsMobile from '@/components/isMobile'

const Page = () => {

  const [topic, setTopic] = useState('top')

  // Create refs for each section
  const topRef = useRef<HTMLDivElement>(null)

  const isMobile = useIsMobile();
  const width = isMobile ? '400px' : '1200px';


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

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
      {/* {
        isMobile
          ? <NavbarMobile topic={topic} setTopic={setTopic} />
          : <Navbar topic={topic} setTopic={setTopic} />
      } */}

      {/* O width é informado pelo style porque as vezes não funciona como w-[<number>] */}
      <div className='z-1 flex flex-col items-center' style={{ width }}>

        <main className='w-full flex flex-col gap-[124px] items-center'>
          <Top ref={topRef} />
        </main>
      </div>
    </div>
  );
}

export default Page;