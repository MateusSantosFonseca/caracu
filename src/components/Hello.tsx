'use client';

import { useUser } from '@clerk/nextjs';

const Hello = () => {
  const { user } = useUser();

  return (
    <div className="my-8 flex">
      Hello,
      <div className="mx-1 font-semibold"> {user?.username?.toString()}</div>
      team&apos;s manager!
    </div>
  );
};

export { Hello };
