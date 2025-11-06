import SidebarProfile from './SidebarProfile';
import SidebarThemeSwitch from './SidebarThemeSwitch';
import SidebarUpload from './SidebarUpload';

function SidebarFooter() {
  return (
    <div className="grid h-full content-end gap-6">
      <SidebarUpload />
      <SidebarThemeSwitch />
      <SidebarProfile />
    </div>
  );
}

export default SidebarFooter;
