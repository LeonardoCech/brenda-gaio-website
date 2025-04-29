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
  const [contentVisible, setContentVisible] = useState(false); // Novo estado para controlar a visibilidade do conteúdo

  useEffect(() => {
    const startAnimations = () => {
      // Limpar timers anteriores
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));

      // Resetar estados se não estiver em view
      if (!isInView) {
        setContentVisible(false); // Esconde o conteúdo se não estiver em view
        return;
      }

      // Inicia a animação de expansão
      timersRef.current.timerExpand = setTimeout(() => {
        setContentVisible(true); // Torna o conteúdo visível após a expansão
      }, 1000); // Atraso igual à duração da animação de expansão
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
      className='w-full h-dvh flex flex-wrap items-center justify-evenly py-[24px]'
      style={{
        scale: isMobile ? 0.8 : 1,
        transformOrigin: 'top',
      }}
    >
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

      <div className={`w-[500px] flex flex-col gap-[2rem] p-[2rem] ${contentVisible ? 'expand-horizontal' : ''}`}>
        <h1
          className={`title ${contentVisible ? 'fade-in' : 'invisible'}`} // Aplica a classe de fade-in quando o conteúdo é visível
          style={{
            fontSize: isMobile ? '2.7rem' : '3.5rem',
          }}
        >
          Prazer, Brenda Aldrovandi Gaio
        </h1>

        <p className={`graduation ${contentVisible ? 'fade-in' : 'invisible'}`}>
          Engenheira de Software
        </p>

        <p className={`university ${contentVisible ? 'fade-in' : 'invisible'}`}>
          Graduada pela Universidade Católica de Santa Catarina
        </p>
      </div>
    </div>
  );
});

Top.displayName = 'Top';

export default Top;