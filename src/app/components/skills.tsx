'use client'

import React, { useEffect, useRef, useState } from 'react';

const Skills = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const skills = [
    {
      icon: <></>,
      title: 'Gestão Ágil de Projetos',
      description: 'Implementação de frameworks ágeis (Scrum, Kanban) adaptados à realidade da empresa:',
      topics: [
        'Entregas frequentes com foco em valor',
        'Priorização clara e visibilidade do trabalho',
        'Redução de gargalos e retrabalho',
      ]
    },
    {
      icon: <></>,
      title: 'Estruturação do Escritório de Projetos (PMO)',
      description: 'Criação ou reestruturação de PMOs com foco em eficiência e escala:',
      topics: [
        'Modelos e processos padronizados',
        'Gestão ativa de riscos e cronogramas',
        'Alocação inteligente de recursos e orçamento'
      ]
    },
    {
      icon: <></>,
      title: 'Melhoria Contínua e Suporte',
      description: 'Criação de uma cultura orientada à evolução constante:',
      topics: [
        'Feedback estruturado e ciclos de melhoria',
        'Monitoramento de desempenho em tempo real',
        'Adaptação contínua às mudanças do mercado'
      ]
    },
    {
      icon: <></>,
      title: 'Gestão de Projetos para Produtos Digitais',
      description: 'Consultoria especializada para times de produto e desenvolvimento:',
      topics: [
        'Alinhamento entre negócio, tecnologia e usuário',
        'Roadmaps estratégicos e planos de entrega realistas',
        'Acompanhamento contínuo da evolução do produto'
      ]
    }
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
      id='skills'
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
      {
        skills.map((skill, index) => (
          <div key={index}>
            <div>
              {skill.icon}
            </div>

            <span></span>

            <div>
              <h1>{skill.title}</h1>
              <p>{skill.description}</p>

              <div>
                {skill.topics.map((topic, index) => (
                  <div key={index}>
                    <p>{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      }
    </div>);
});

Skills.displayName = 'Skills';

export default Skills;