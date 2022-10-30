import { useEffect, useRef, useState } from "react";

export const useRecording = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedDataSrc, setRecordedDataSrc] = useState<string>();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const videoRef = useRef<HTMLMediaElement>(null);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (!videoRef.current) return;
          videoRef.current.srcObject = stream;

          // mediaRecorderオブジェクトの生成
          const options = { mimeType: "video/webm; codecs=vp9" };
          const data = new MediaRecorder(stream, options);
          setMediaRecorder(data);

          // 録画の開始
          data.start();
          setIsRecording(true);

          // 録画のデータのsrcを保存
          data.ondataavailable = (e: BlobEvent) => {
            const src = URL.createObjectURL(e.data);
            setRecordedDataSrc(src);
          };
        });
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    recordedDataSrc,
    isRecording,
    videoRef,
  };
};
