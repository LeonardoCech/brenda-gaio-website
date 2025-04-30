'use client'

import React, { useEffect, useRef, useState } from 'react';

const Certifications = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const certificates = [
    { title: 'Gerenciamento de Portfólio e PMO', institution: 'Fundação Getulio Vargas;' },
    { title: 'Tendências em Gerenciamento de Projetos', institution: 'Fundação Getulio Vargas;' },
    { title: 'Scrum Fundamentals Certified', institution: 'SFC;' },
    { title: 'Scrum Foundation Professional Certificate', institution: 'SFPC;' },
    { title: 'Scrum Day Brazil;' },
    { title: 'Trilha Kanban', institution: 'The Developers Conference;' },
    { title: 'Trilha Agile e Agile Coaching', institution: 'The Developers Conference;' },
  ]

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
      id='certifications'
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
      <h1>Principais Certificações</h1>

      <div>
        {certificates.map((certificate, index) => (
          <div 
            key={index}
            className='flex'
          >
            <p>{certificate.title}</p>

            {certificate?.institution && <p>&nbsp; &mdash; {certificate.institution}</p>}
          </div>
        ))}
      </div>
    </div>);
});

Certifications.displayName = 'Certifications';

export default Certifications;