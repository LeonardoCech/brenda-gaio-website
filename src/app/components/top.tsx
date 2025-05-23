'use client'

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import useIsMobile from './isMobile';

const Top = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const isMobile = useIsMobile();
  const width = isMobile ? '400px' : '1264px';
  const mobileMult = .5;
  const desktopMult = .7;

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [contentVisible, setContentVisible] = useState(false); // Novo estado para controlar a visibilidade do conteúdo

  useEffect(() => {
    const startAnimations = () => {
      // Limpar timers anteriores
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));

      // // Resetar estados se não estiver em view
      // if (!isInView) {
      //   setContentVisible(false); // Esconde o conteúdo se não estiver em view
      //   return;
      // }

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
      className='w-full h-fit flex flex-wrap justify-evenly items-center'
      style={{ width }}
    >
      <div className={`w-fit h-fit flex justify-center items-center`} >
        <div
          id='image-container'
          style={{
            marginTop: isMobile ? '2rem' : '5rem',
            width: `calc(550px * ${isMobile ? mobileMult : desktopMult})`,
            height: `calc(872px * ${isMobile ? mobileMult : desktopMult})`,
          }}
        >
          <div
            id='panel-1'
            className='panel'
            style={{
              height: `calc(810px * ${isMobile ? mobileMult : desktopMult})`,
              width: `calc(488px * ${isMobile ? mobileMult : desktopMult})`,
              bottom: `calc(62px * ${isMobile ? mobileMult : desktopMult})`,
            }}
          />

          <div
            id='panel-2'
            className='panel'
            style={{
              height: `calc(622px * ${isMobile ? mobileMult : desktopMult})`,
              width: `calc(488px * ${isMobile ? mobileMult : desktopMult})`,
              left: `calc(62px * ${isMobile ? mobileMult : desktopMult})`,
            }}
          />

          <Image
            id='image'
            src='image.png'
            alt='Brenda Aldrovandi Gaio'
            width={490 * (isMobile ? mobileMult : desktopMult)}
            height={770 * (isMobile ? mobileMult : desktopMult)}
            style={{
              left: `calc(28px * ${isMobile ? mobileMult : desktopMult})`,
              bottom: `calc(62px * ${isMobile ? mobileMult : desktopMult})`,
            }}
          />
        </div>
      </div>

      <div
        className={`flex flex-col ${contentVisible ? 'expand-horizontal' : ''}`}
        style={{
          width: isMobile ? '300px' : '500px',
          fontSize: isMobile ? '2rem' : '4rem',
          lineHeight: isMobile ? '2rem' : '4rem',
          gap: isMobile ? '2rem' : '4rem',
        }}
      >
        <span
          className='flex flex-col gap-[.75rem]'
          style={{
            paddingTop: isMobile ? '2rem' : '10rem',
          }}
        >
          <h1 className={`title ${contentVisible ? 'fade-in' : 'invisible'}`} >
            Prazer, Brenda
          </h1>

          <h1 className={`title ${contentVisible ? 'fade-in' : 'invisible'}`} >
            Aldrovandi Gaio
          </h1>
        </span>

        <span
          className='flex flex-col gap-[1.5rem]'
          style={{
            fontSize: isMobile ? '1.25rem' : '2rem',
            lineHeight: isMobile ? '1.25rem' : '2rem',
          }}
        >
          <p className={`graduation ${contentVisible ? 'fade-in' : 'invisible'}`}>
            Engenheira de Software
          </p>

          <p className={`university ${contentVisible ? 'fade-in' : 'invisible'}`}>
            Graduada pela Universidade Católica de Santa Catarina
          </p>
        </span>
      </div>
    </div>
  );
});

Top.displayName = 'Top';

export default Top;