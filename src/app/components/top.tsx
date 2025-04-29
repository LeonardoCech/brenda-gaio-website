'use client'

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import useIsMobile from '@/components/isMobile';

const Top = React.forwardRef<HTMLDivElement>((_props, ref) => {

  // const [logoVisible, setLogoVisible] = useState(false);
  // const [firstPhraseVisible, setFirstPhraseVisible] = useState(false);
  // const [secondPhraseVisible, setSecondPhraseVisible] = useState(false);
  // const [roleVisible, setRoleVisible] = useState(false);
  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const startAnimations = () => {
      // Limpar timers anteriores
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));

      // Resetar estados se não estiver em view
      if (!isInView) {
        // setLogoVisible(false);
        // setFirstPhraseVisible(false);
        // setSecondPhraseVisible(false);
        // setRoleVisible(false);
        return;
      }

      // // Inicia a logo e 'role para continuar'
      // timersRef.current.timerLogo = setTimeout(() => setLogoVisible(true), 100);

      // // Inicia a primeira frase com delay
      // timersRef.current.timer1 = setTimeout(() => setFirstPhraseVisible(true), 300);

      // // Inicia a segunda frase com delay adicional
      // timersRef.current.timer2 = setTimeout(() => setSecondPhraseVisible(true), 1000);

      // // Inicia o 'role para continuar' junto com a logo
      // timersRef.current.timer3 = setTimeout(() => setRoleVisible(true), 100);
    };

    startAnimations();

    const timers = timersRef.current;
    return () => {
      // Limpar timers quando o componente é desmontado ou isInView muda
      Object.values(timers).forEach(timer => clearTimeout(timer));
    };
  }, [isInView]);

  useEffect(() => {
    // Configurar o Intersection Observer para detectar quando o usuário passa pela seção
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      // Atualiza o estado baseado na visibilidade da seção
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.5, // Trigger quando 50% da seção estiver visível (ajuste conforme necessário)
      rootMargin: '0px'
    });

    // Observar a seção
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Desconectar o observer
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id='top'
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        sectionRef.current = node;
      }}
      className='w-full h-dvh flex flex-wrap items-center justify-evenly py-[24px]'>
      <div 
        className={`w-fit ${isMobile ? 'h-fit' : 'h-screen'} flex justify-center items-center`}
        >
        <div id='image-container'>
          <div className='panel' id='panel-1'></div>
          <div className='panel' id='panel-2'></div>
          <Image
            id='image'
            src='BrendaGaio.png'
            alt='Brenda Aldrovandi Gaio'
            width={401 * .75}
            height={622 * .75}
          />
        </div>
      </div>

      <div className='w-[500px] flex flex-col gap-[2rem] p-[2rem]'>
        <h1 className='title'>Prazer, Brenda Aldrovandi Gaio</h1>

        <p className='graduation'>Engenheira de Software</p>

        <p className='university'>
          Graduada pela Universidade Católica de Santa Catarina
        </p>
      </div>
    </div>
  );
});

Top.displayName = 'Top';

export default Top;