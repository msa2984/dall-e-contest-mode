import { Dispatch, SetStateAction } from "react";

interface IPreviewDataProps {
  textData: string | ArrayBuffer;
  setTextData: Dispatch<SetStateAction<string | ArrayBuffer>>;
}

export default IPreviewDataProps;
