import { useEffect, useRef, useState } from "react";

export const useRecording = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedDataSrc, setRecordedDataSrc] = useState<string>();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // カメラのトラッキングを終了→緑ランプも消える
  const [videoTracks, setVideoTracks] = useState<MediaStreamTrack[]>();

  // タイマー用
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  type SubTime = {
    time: number;
    isStoppingUser: boolean;
  };
  const [subTime, setSubTime] = useState<SubTime>({
    time: 1,
    isStoppingUser: true,
  });
  const [subTimer, setSubTimer] = useState<NodeJS.Timeout>();

  // videoタグへのRef
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

    // タイマーをStart
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    setTimer(timer);

    // サブタイマーをStart
    const subTimer = setInterval(() => {
      setSubTime((val) => {
        if (val.time === 0) {
          // ユーザの次の動作が何か
          if (val.isStoppingUser) {
            // Stop→Move
            const newSubTime = { time: 2, isStoppingUser: false };
            return newSubTime;
          } else {
            // Move→Stop
            const newSubTime = { time: 1, isStoppingUser: true };
            return newSubTime;
          }
        } else {
          // timerを減らす
          const newSubTime = {
            time: val.time - 1,
            isStoppingUser: val.isStoppingUser,
          };
          return newSubTime;
        }
      });
    }, 1000);
    setSubTimer(subTimer);
  };

  // 録画の終了
  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);

    // トラックの終了
    // videoTracks.forEach((track) => {
    //   track.stop();
    // });

    // タイマーをStop
    clearInterval(timer);
    setTime(0);
    clearInterval(subTimer);
    const resetSubTime = { time: 1, isStoppingUser: true };
    setSubTime(resetSubTime);
  };

  return {
    startRecording,
    stopRecording,
    recordedDataSrc,
    isRecording,
    videoRef,
    time,
    subTime,
  };
};
