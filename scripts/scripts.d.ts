export type ExportedImagesMetaData = {
  large: {
    org: string;
  };
  small: {
    org: string;
  };
  aspectHTW: number;
};

export type Work = {
  title: string;
  url: string;
  stack: string;
  description: string;
  repo: {
    url: string;
    type: 'github';
  };
  image: ExportedImagesMetaData;
};
