import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const About = () => (
  <Main
    meta={
      <Meta
        title="Sobre"
        description="Sobre o Caracu - Sistema de Sorteio de Equipes para Pelada"
      />
    }
  >
    <div className="space-y-8">
      <div className="mb-4 mt-2 block">
        <p className="leading-relaxed">
          O Caracu é uma solução para montar times de futsal equilibrados e
          tornar as partidas de pelada mais divertidas e pegadas!
        </p>
        <p className="font-semibold leading-relaxed">
          Registre e entre com seu time:
        </p>
        <ul className="list-disc pl-8 leading-relaxed">
          <li>
            Crie uma conta que será usada por todos os jogadores do seu time.
            Todos usarão o mesmo username e senha que você definir. Na aba
            Conta, você pode trocar todas as informações que desejam a qualquer
            momento.
          </li>
        </ul>
        <p className="font-semibold leading-relaxed">
          Gerencie Seus Jogadores:
        </p>
        <ul className="list-disc pl-8 leading-relaxed">
          <li>
            Adicione, edite ou remova os jogadores da sua pelada, fornecendo
            detalhes como nome, habilidade (rating), ritmo e posição preferida.
          </li>
        </ul>
        <div>
          <div className="font-semibold leading-relaxed">Tipos de Sorteio:</div>
          <div className="text-sm text-gray-500">
            O Caracu oferece apenas sorteios para times de futsal, ou seja, de 4
            jogadores de linha. Dito isso, não é possível sortear times com
            maior ou menor número de jogadores. Além disso, não é possível
            adicionar nem sortear goleiros.
          </div>
        </div>
        <ul className="list-disc pl-8 leading-relaxed">
          <li>
            <span className="font-semibold">Sorteio Inteligente:</span> Use o
            botão Smart para um sorteio inteligente! Nos comunicamos com o
            ChatGPT para criar um sorteio que equilibra as habilidades e
            posições dos jogadores que você selecionar, garantindo times mais
            justos.
          </li>
          <li>
            <span className="font-semibold">Sorteio Aleatório:</span> Com o
            botão &quot;random&quot;, sorteamos todos os times de forma
            totalmente aleatória.
          </li>
          <li>
            <span className="font-semibold">
              Sorteio Personalizado (Custom):
            </span>{' '}
            O Caracu organiza os jogadores considerando a estamina e o rating.
            Começamos com os defensores mais fortes, mas garantimos que os times
            tenham equilíbrio em habilidade e resistência.
          </li>
        </ul>
      </div>
    </div>
  </Main>
);

export default About;
