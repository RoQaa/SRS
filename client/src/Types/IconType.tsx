export interface FlagIconType {
  getITag:(tag: string) => void
  }

  export interface GetItagProp {
    abbrivation: string;
  }

  export interface IconsCommonProps {
    title: string;
    iconType: string[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    parentCallback: Function;
  }
  