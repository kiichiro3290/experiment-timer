import { useEffect, useRef, useState } from "react";

export const useRecording = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedDataSrc, setRecordedDataSrc] = useState<string>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoTracks, setVideoTracks] = useState<MediaStreamTrack[]>();

  const videoRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        // trackの生成
        const tracks = stream.getTracks();
        setVideoTracks(tracks);

        // mediaRecorderオブジェクトの生成
        const options = { mimeType: "video/webm; codecs=vp9" };
        const data = new MediaRecorder(stream, options);
        setMediaRecorder(data);
      });
    }
  }, []);

  // 録画の開始
  const startRecording = () => {
    mediaRecorder.start();
    setIsRecording(true);

    // 録画のデータのsrcを保存
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      const src = URL.createObjectURL(e.data);
      setRecordedDataSrc(src);
    };
  };

  // 録画の終了
  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);

    // トラックの終了
    // videoTracks.forEach((track) => {
    //   track.stop();
    // });
  };

  return {
    startRecording,
    stopRecording,
    recordedDataSrc,
    isRecording,
    videoRef,
  };
};
