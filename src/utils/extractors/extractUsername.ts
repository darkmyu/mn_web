export async function extractUsername(params: Promise<{ username: string }>) {
  const { username } = await params;
  const encodedSymbol = encodeURIComponent('@');

  return username.replace(encodedSymbol, '');
}
