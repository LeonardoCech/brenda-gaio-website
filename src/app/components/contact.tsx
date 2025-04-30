'use client'

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import useIsMobile from '@/components/isMobile';

const Contact = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const isMobile = useIsMobile();

  useEffect(() => {
    const startAnimations = () => {
      // Limpar timers anteriores
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
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
      id='contact'
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        sectionRef.current = node;
      }}
      className='h-fit flex flex-col justify-center items-center p-[2rem] gap-[3rem]'
      style={{
        width: isMobile ? 'unset' : '100%'
      }}
    >
      <div 
        className='w-fit h-fit container flex justify-center items-center rounded-[1rem]'
        style={{
          padding: isMobile ? '2rem' : '4rem'
        }}
        >
        <div
          className='content flex flex-col items-center gap-[2rem]'
          style={{
            width: isMobile ? '100%' : '540px'
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? '1.5rem' : '2.5rem',
              lineHeight: isMobile ? '1.5rem' : '2.5rem',
            }}
          >Orçamentos e Contato</h1>

          <p>Os orçamentos são desenvolvidos de maneira personalizada, baseados na análise das particularidades e demandas da empresa.</p>

          <p>ENTRE EM CONTATO CLICANDO NO ÍCONE DESEJADO:</p>

          <div className='flex items-center gap-[2rem]'>
            <a href='https://api.whatsapp.com/send/?phone=4789108767&text&type=phone_number&app_absent=0'>
              <Image src='/whatsapp.svg' alt='WhatsApp' width={40} height={40} />
            </a>

            <a href='mailto:bbrendagaioo@gmail.com'>
              <Image src='/mail.svg' alt='E-mail' width={40} height={40} />
            </a>

            <a href='https://www.linkedin.com/in/brendaaldrovandigaio/'>
              <Image src='/linkedin.svg' alt='LinkedIn' width={40} height={40} />
            </a>
          </div>
        </div>
      </div>

      <p className='text-[#F0F0F0]'>
        Desenvolvido por &nbsp;
        <a href='https://leonardocech.dev' className='font-bold hover:underline'>
          leonardocech.dev
        </a>
      </p>
    </div>);
});

Contact.displayName = 'Contact';

export default Contact;