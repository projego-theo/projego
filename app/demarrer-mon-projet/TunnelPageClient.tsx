'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const TunnelQualification = dynamic(
  () => import('./TunnelQualification'),
  { ssr: false }
);

export default function TunnelPageClient() {
  const router = useRouter();
  return <TunnelQualification variant="page" onClose={() => router.push('/')} />;
}
