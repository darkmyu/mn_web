import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return <div className="h-dvh bg-zinc-50 dark:bg-zinc-900">{children}</div>;
}

export default Layout;
