import Header from '@/components/header/Header';
import Profile from '@/components/profile/Profile';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  return (
    <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
      <Header />
      <main className="col-2 my-14 flex flex-col gap-24">
        <Profile />
      </main>
    </div>
  );
}
