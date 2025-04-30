'use client'

import React, { useEffect, useRef, useState } from 'react';

const Experience = React.forwardRef<HTMLDivElement>((_props, ref) => {

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
      id='experience'
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
      <h1>Experiência</h1>

      <p>
        Com 4 anos de experiência na área de projetos de software, atuei como Scrum Master em mais de 10 times e liderei mais de 15 projetos ágeis de produtos digitais. Nesse período, implementei metodologias ágeis, boas práticas e cerimônias, promovendo a melhoria contínua dos processos de desenvolvimento e gestão. Também estruturei um escritório de projetos com atuação em nível estratégico e departamental, de grande abrangência, envolvendo diferentes áreas organizacionais. Nesse contexto, desenvolvi novos processos de projetos e produtos, incluindo a definição de padrões, priorizações, lançamentos e indicadores (KPIs) para monitorar eficiência, entregas, progressos, atrasos, disponibilidades e riscos.
      </p>
    </div>);
});

Experience.displayName = 'Experience';

export default Experience;