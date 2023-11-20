import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();

  const redirectToSignIn = () => {
    router.push('/sign-in/');
  };

  const redirectToSignUp = () => {
    router.push('/sign-up/');
  };

  return (
    <Main
      meta={
        <Meta
          title="Caracu"
          description="Caracu foi feito para facilitar o sorteio de equipes de forma equilibrada."
        />
      }
    >
      <div className="items-center justify-center text-center">
        <div>
          <button
            type="button"
            onClick={redirectToSignIn}
            className="mr-4 rounded bg-blue-500 px-4 py-1 text-base font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={redirectToSignUp}
            className="rounded bg-blue-500 px-4 py-1 text-base font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          >
            Registrar
          </button>
        </div>
      </div>
    </Main>
  );
};

export default Index;
