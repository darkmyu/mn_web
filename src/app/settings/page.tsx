import { authControllerInfo } from '@/api/auth';
import SettingAccount from '@/components/setting/SettingAccount';
import SettingDisplay from '@/components/setting/SettingDisplay';
import SettingProfileSuspense from '@/components/setting/SettingProfileSuspense';
import SettingSidebar from '@/components/setting/SettingSidebar';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ tab?: 'profile' | 'account' | 'display' }>;
}

export default async function SettingsPage({ searchParams }: Props) {
  const { tab = 'profile' } = await searchParams;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  await authControllerInfo({
    headers: {
      cookie,
    },
  }).then((response) => {
    if (response.data.profile === null) redirect(ROUTE_HOME_PAGE);
  });

  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-[280px_1fr] items-start gap-20 px-4 py-16 max-lg:flex max-lg:flex-col max-lg:gap-10 max-lg:py-8">
      <SettingSidebar />
      {tab === 'profile' && <SettingProfileSuspense />}
      {tab === 'account' && <SettingAccount />}
      {tab === 'display' && <SettingDisplay />}
    </div>
  );
}
