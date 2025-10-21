import AdBanner from '../AdBanner';

export default function AdBannerExample() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <AdBanner slot="1234567890" format="auto" />
      <AdBanner slot="0987654321" format="horizontal" />
    </div>
  );
}
