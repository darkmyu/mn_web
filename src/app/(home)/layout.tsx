import HomeTab from '@/components/home/HomeTab';

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-8 p-4">
      <HomeTab />
      {children}
    </div>
  );
}
