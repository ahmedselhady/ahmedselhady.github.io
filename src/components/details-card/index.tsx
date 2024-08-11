import { Fragment } from 'react';
import {
  FaGlobe,
} from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
};
import {
  faLinkedinIn,
  faGoogleScholar,
  faGithub,
  faXTwitter,
  faInstagram,
  faReadme,
  faUpwork,
  faWpbeginner
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Gmail = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60px" height="60px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" /><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" /><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" /><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" /><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" /></svg>)
}

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');

  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `${username}@${server}`;
  }
};


const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-large gap-1 flex items-center my-1">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex justify-start py-2 px-1 items-center"
        >{icon}
        </a>
      </div>

    </div>
  );
};



/**
 * Renders the details card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} social - The social object.
 * @param {Object} github - The GitHub object.
 * @return {JSX.Element} The details card component.
 */
const DetailsCard = ({ profile, loading, social, github }: Props) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <ListItem
          key={index}
          skeleton={true}
          icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
          title={skeleton({ widthCls: 'w-30', heightCls: 'h-4' })}
          value={skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        />,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="text-base-content text-opacity-60">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>
              <div className="text-center font-bold text-2xl">
                Reach Me @
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 rounded-box">

                <ListItem
                  icon={<FontAwesomeIcon icon={faGithub} size="4x" style={{ color: 'black' }}/>}
                  title=""
                  value=""
                  link={`https://github.com/${github.username}`}
                />
                <ListItem
                  icon={<FontAwesomeIcon icon={faGoogleScholar} size="4x" style={{ color: '#0a66c2' }}/>}
                  title=""
                  value=""
                  link={`https://scholar.google.com/citations?user=${social.scholar}&hl=en`}
                />
                {social?.twitter && (
                  <ListItem
                    icon={<FontAwesomeIcon icon={faXTwitter} size="4x" style={{ color: 'black' }} />}
                    title=""
                    value=""
                    link={`https://twitter.com/${social.twitter}`}
                  />
                )}
                {social?.linkedin && (
                  <ListItem
                    icon={<FontAwesomeIcon icon={faLinkedinIn} size="4x" style={{ color: '#0a66c2' }} />}
                    title=""
                    value=""
                    link={`https://www.linkedin.com/in/${social.linkedin}`}
                  />
                )}
                {social?.instagram && (
                  <ListItem
                    icon={<FontAwesomeIcon icon={faInstagram} size="4x" style={{ color: '#e57b1d' }} />}
                    title=""
                    value=""
                    link={`https://www.instagram.com/${social.instagram}`}
                  />
                )}
                {social?.website && (
                  <ListItem
                    icon={<FontAwesomeIcon icon={faReadme} size="4x" style={{ color: '#e57b1d' }} />}
                    title="Website:"
                    value={social.website
                      .replace('https://', '')
                      .replace('http://', '')}
                    link={
                      !social.website.startsWith('http')
                        ? `http://${social.website}`
                        : social.website
                    }
                  />
                )}
                {social?.email && (
                  <ListItem
                    icon={<Gmail />}
                    title=""
                    value=""
                    link={`mailto:${social.email}`}
                  />
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
