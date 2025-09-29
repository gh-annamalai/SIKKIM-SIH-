import { type FC } from 'react';

const PemayangtseVirtualTour: FC = () => {
  return (
    <div className="h-screen w-full">
      <iframe
        src="/tours/pemayangtse.html"
        className="w-full h-full border-0"
        allow="xr-spatial-tracking; camera; microphone"
      />
    </div>
  );
};

export default PemayangtseVirtualTour;