'use client'

import React, { useEffect, useRef, useState } from 'react';

const Results = React.forwardRef<HTMLDivElement>((_props, ref) => {

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
      id='results'
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
      <div>
        <div>
          <h1>Os Resultados</h1>

          <p>Resultados</p>
        </div>

        <div>
          <p>Eficiência Operacional</p>

          <p>Aumento da produtividade com entregas mais rápidas sem comprometer a qualidade.</p>
        </div>

        <div>
          <p>Redução de Riscos</p>

          <p>Maior controle sobre o progresso do projeto, evitando surpresas e garantindo a entrega no prazo.</p>
        </div>

        <div>
          <p>Visibilidade e Alinhamento Estratégico</p>

          <p>Maior clareza sobre o andamento do projeto e alinhamento das metas do produto digital com as estratégias do negócio</p>
        </div>

        <div>
          <p>Satisfação do Cliente Final</p>

          <p>Entrega de um produto digital de alta qualidade, adaptado às necessidades do mercado e com maior confiança dos clientes finais.</p>
        </div>
      </div>

      <div>
        <p>Identificação do problema</p>

        {/* icone de seta */}

        <p>Aplicação da solução</p>

        {/* icone de seta */}

        <p>Performance positiva</p>
      </div>
    </div>);
});

Results.displayName = 'Results';

export default Results;