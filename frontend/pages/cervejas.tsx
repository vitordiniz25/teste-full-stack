
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CervejasPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session)

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      <h1>Cervejas</h1>
    </div>
  );
};

export default CervejasPage;
