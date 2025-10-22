// /app/services/page.tsx
import { Suspense } from 'react';
import ServicesPageContent from './ServicePageContent';

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesPageContent />
    </Suspense>
  );
}
