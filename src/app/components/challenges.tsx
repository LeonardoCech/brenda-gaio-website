'use client'

import React, { useEffect, useRef, useState } from 'react';

const Challenges = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

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
      id='challenges'
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        sectionRef.current = node;
      }}
      className='w-full h-dvh flex flex-col'
    >
      <h1>Desafios em Projetos de Software</h1>

      <div>
        <div>
          <p>Falta de alinhamento entre equipes e stakeholders.</p>

          <p>Processos ineficazes ou desorganizados</p>

          <p>Dificuldade em entregar valor contínuo aos clientes.</p>
        </div>

        <div>
          <p>Gestão ineficaz de prazos, orçamentos e qualidade</p>

          <p>Resistência à mudança ou à adoção de novas tecnologias e metodologias.</p>
        </div>
      </div>
    </div>);
});

Challenges.displayName = 'Challenges';

export default Challenges;