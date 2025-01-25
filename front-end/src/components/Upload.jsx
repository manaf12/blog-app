import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";


const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


const Upload = ({ children, type, setProgress, setData ,setIsUploading }) => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const onError = (err) => {
    console.log(err);
    setIsLoading(false);
    setIsUploading?.(false);
    toast.error("Image upload failed!");
    setProgress(0);

  };
  const onSuccess = (res) => {
    setIsLoading(false);
    setIsUploading?.(false);
    setData(res);
    setProgress(100);
    toast.success("Upload completed!");
  };
  const onUploadStart = () => {
    setIsLoading(true);
    setIsUploading?.(true);
    setProgress(0);
  };
  const onUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
