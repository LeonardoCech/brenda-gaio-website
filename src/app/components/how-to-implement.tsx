'use client'

import React, { useEffect, useRef, useState } from 'react';

const HowToImplement = React.forwardRef<HTMLDivElement>((_props, ref) => {

  const [isInView, setIsInView] = useState(true); // Assume que está em view inicialmente
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const services = [
    {
      icon: <></>,
      title: 'Palestra e Workshops',
      description: 'Para conscientizar e engajar o time sobre agilidade, gestão de produtos ou processos'
    },
    {
      icon: <></>,
      title: 'Treinamentos Customizados',
      description: 'Ensino prático, voltado à realidade do seu time (Scrum, Kanban, métricas, etc.)'
    },
    {
      icon: <></>,
      title: 'Implantação de Metodologias',
      description: 'Criação de rituais, papéis, rotinas e processos reais aplicados ao seu contexto.'
    },
    {
      icon: <></>,
      title: 'Documentação e Templates',
      description: 'Modelos de atas, fluxos, apresentações e estruturas para escalar processos.'
    },
    {
      icon: <></>,
      title: 'Indicadores e Métricas',
      description: 'Criação de KPIs, OKRs e dashboards de performance.'
    },
    {
      icon: <></>,
      title: 'Configuração de Ferramentas',
      description: 'Customização de Jira Cloud (ou outras), fluxos, automações e permissões.'
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
      id='how-to-implement'
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
      <h1>Como implementar essa solução na <span>sua empresa?</span></h1>

      <div>
        <p>1</p>

        <div>
          <p>Diagnóstico Inicial</p>

          <p>Entendendo sua empresa, seus objetivos e o nível de maturidade ágil.</p>
        </div>
      </div>

      {/* seta */}

      <div>
        <p>2</p>

        <div>
          <p>Identificação de Gaps</p>

          <p>Avaliando onde estão os pontos de melhoria em processos, produtos e gestão.</p>
        </div>
      </div>

      {/* seta */}

      <div>
        <p>3</p>

        <div>
          <p>Definição do(s) Serviço(s) Mais Alinhado(s)</p>

          <p>A partir da análise, indico o que realmente faz sentido para sua empresa.</p>
        </div>
      </div>

      {/* Heritage */}

      <div>
        {services.map((service, index) => (
          <div key={index}>
            {service.icon}

            <div>
              <p>{service.title}</p>

              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* seta */}

      <div>
        <p>4</p>

        <div>
          <p>Execução Personalizada</p>

          <p>Aplico o plano da ação com base no(s) serviço(s) escolhido(s), sempre com entregas e validações constantes.</p>
        </div>
      </div>

      {/* seta */}

      <div>
        <p>5</p>

        <div>
          <p>Avaliação e Evolução Contínua</p>

          <p>Acompanho os resultados e ajusto o que for necessário para gerar valor real.</p>
        </div>
      </div>
    </div>);
});

HowToImplement.displayName = 'How to Implement';

export default HowToImplement;