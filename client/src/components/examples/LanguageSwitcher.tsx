import LanguageSwitcher from '../LanguageSwitcher';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function LanguageSwitcherExample() {
  return (
    <LanguageProvider>
      <div className="flex justify-end p-4 bg-background">
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
}
