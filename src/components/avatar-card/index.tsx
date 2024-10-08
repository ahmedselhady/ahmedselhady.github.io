import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import { MdLocationOn, MdPermPhoneMsg } from 'react-icons/md';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-large gap-2 flex items-center my-1">
        {icon} {title}
      </div>
      <div
        className={`${skeleton ? 'flex-grow' : ''
          } text-sm font-normal text-right mr-2 ml-3 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex justify-start py-2 px-1 items-center"
        >
          {value}
        </a>
      </div>
    </div>
  );
};



/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
}): JSX.Element => {
  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-30 h-30">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-10 rounded-full w-29 h-29 ${avatarRing
                ? 'ring ring-primary ring-offset-base-100 ring-offset-4'
                : ''
                }`}
            >
              {
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-12">
          <h5 className="font-bold text-3xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-30', heightCls: 'h-30' })
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
          <div className="mt-3 text-base-content text-opacity-60 font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 text-base-content text-opacity-60 ">
            <ListItem
            icon={<MdLocationOn size={22} />}
            title="San Sebastian, Spain"
            value=""
          />

          <ListItem
            icon={<MdPermPhoneMsg size={22} />}
            title="(+34) 634-089-871"
            value=""
          />
        </div>

        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-outline btn-sm text-xs mt-6 opacity-50"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
