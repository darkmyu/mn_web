import { UserSocialLinkResponse } from '@/api/index.schemas';
import ProfileSocialLinkItem from './ProfileSocialLinkItem';

interface Props {
  socialLinks: UserSocialLinkResponse[];
}

function ProfileSocialLinkList({ socialLinks }: Props) {
  if (socialLinks.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold max-lg:hidden">소셜</p>
      <div className="flex gap-4">
        {socialLinks.map((socialLink) => (
          <ProfileSocialLinkItem key={socialLink.type} socialLink={socialLink} />
        ))}
      </div>
    </div>
  );
}

export default ProfileSocialLinkList;
