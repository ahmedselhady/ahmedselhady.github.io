import { Fragment } from 'react';
import { SanitizedAbout } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const AboutCard = ({
  about,
  loading
}: {
  about: string;
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 1; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="px-4">
                  <div className="text-center w-full">
                    <h2 className="mb-2">
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div>
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-20',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                    <div>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mb-2 mx-auto',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderAbout = () => {
    return [about].map((item, index) => (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        key={index}
        href="#"
        rel="noreferrer"
      >
        <div className="p-8 h-full w-full">
          <div className="flex items-left flex-col">
            <div className="w-full">
              <div className="px-4">
                <div className="text-left w-full">
                  <h1 className="font-bold opacity-80 mb-5 text-3xl">Hi! I am Ahmed,</h1>
                  <h2 className=" opacity-80 mb-5 text-2xl">I am a PhD Research Student at The University of the Basque Country (UPV) under the supervision of <a className="font-bold" href="https://scholar.google.com/citations?user=N5InzP8AAAAJ">Mikel Artetxe</a> and <a className="font-bold" href="https://scholar.google.com/citations?user=kSuqts0AAAAJ&hl=en"> Eneko Agirre </a>.</h2>
                  <div className=" opacity-80 mb-5 text-2xl">I am working on the analysis, evaluation, and improvement of multilinguality in Large Language Models (LLMs)</div>
                  <div className="opacity-80 mb-5 text-2xl">Before embarking on my PhD, I worked as an Applied Data Scientist at <span className="font-bold">Microsoft Bing's</span> news and content moderation and understanding (now part of Windows and Web Experience)</div>
                  <div className="opacity-80 mb-5 text-xl">I also worked as an Applied Data Scientist at <span className='font-bold' >Agolo</span>, a Microsoft-backed startup, where I worked on multiple projects building summarization solutions for elite clients such as Franklin Templeton, Associated Press, and Microsoft azure.</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-3">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h5 className="card-title">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                      </span>
                    )}
                  </h5>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {loading ? renderSkeleton() : renderAbout()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutCard;
