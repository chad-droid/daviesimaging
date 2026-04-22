import type { Metadata } from 'next';
import './styles.css';
import MMLanding from '@/components/lp/MMLanding';

export const metadata: Metadata = {
  title: 'ModelMatch — Virtual Staging for Homebuilders',
  description:
    'Virtual staging for Builders, not realtors. Claim your first five free staged images. Delivered in 24 hours.',
  openGraph: {
    title: 'ModelMatch — Virtual Staging for Homebuilders',
    description:
      'Virtual staging crafted from your model homes. Five free images to try the service.',
    type: 'website',
  },
  // LinkedIn ad destination — do not index or follow (paid traffic only)
  robots: { index: false, follow: false },
};

export default function ModelMatchTrialInfoPage() {
  return <MMLanding />;
}
