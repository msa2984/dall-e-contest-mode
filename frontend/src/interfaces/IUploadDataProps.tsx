import { Dispatch, SetStateAction } from "react";

interface IUploadDataProps {
  textData: string | ArrayBuffer;
  setTextData: Dispatch<SetStateAction<string | ArrayBuffer>>;
}

export default IUploadDataProps;
