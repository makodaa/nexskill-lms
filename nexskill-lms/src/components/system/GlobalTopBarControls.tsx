import MultiLanguageSelector from './MultiLanguageSelector';
import DarkModeToggle from './DarkModeToggle';

const GlobalTopBarControls: React.FC = () => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <MultiLanguageSelector />
      <DarkModeToggle />
    </div>
  );
};

export default GlobalTopBarControls;
