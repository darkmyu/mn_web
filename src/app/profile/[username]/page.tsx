import AnimalChip from '@/components/animal/AnimalChip';
import AnimalGrid from '@/components/animal/AnimalGrid';
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
      <main className="col-2 my-16 flex flex-col gap-24">
        <Profile />
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <AnimalChip />
            <AnimalChip />
            <AnimalChip />
          </div>
          <AnimalGrid />
        </div>
      </main>
    </div>
  );
}
