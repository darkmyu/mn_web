import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function ProfileLayout({ children, params }: Props) {
  const { username } = await params;
  const encodedSymbol = encodeURIComponent('@');

  if (!username.includes(encodedSymbol)) {
    notFound();
  }

  return children;
}
