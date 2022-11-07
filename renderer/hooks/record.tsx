import { useEffect, useRef, useState } from "react";

type SubTime = {
  time: number;
  isStoppingUser: boolean;
};

export const useRecording = (limitMin: number) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordedDataSrc, setRecordedDataSrc] = useState<string>();
  const [recordedData, setRecordedData] = useState<Blob>();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // カメラのトラッキングを終了→緑ランプも消える
  const [videoTracks, setVideoTracks] = useState<MediaStreamTrack[]>();

  // 録画開始時間
  const [startedAt, setStartedAt] = useState<Date>();

  // タイマー用
  const [minTime, setMinTime] = useState<number>();
  const [time, setTime] = useState<number>(0);
  const [mSecondTime, setMSecondTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [mSecondTimer, setMSecondTimer] = useState<NodeJS.Timeout>();
  const [minTimer, setMinTimer] = useState<NodeJS.Timeout>();

  const [subTime, setSubTime] = useState<SubTime>({
    time: 1,
    isStoppingUser: true,
  });
  const [mSecondSubTime, setMSecondSubTime] = useState<number>(0);
  const [subTimer, setSubTimer] = useState<NodeJS.Timeout>();
  const [mSecondSubTimer, setMSecondSubTimer] = useState<NodeJS.Timeout>();

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
    setStartedAt(new Date());

    // 録画のデータのsrcを保存
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      const src = URL.createObjectURL(e.data);
      // このURLを破棄するときは URL.rebokeObjectURL
      setRecordedDataSrc(src);
      setRecordedData(e.data);
    };

    // タイマーをStart
    setMSecondTime(99);
    setTime(59);
    const timer = setInterval(() => {
      setTime((t) => {
        if (t === 0) {
          return 59;
        } else {
          return t - 1;
        }
      });
    }, 1000);
    setTimer(timer);

    // msタイマー
    const msTimer = setInterval(() => {
      setMSecondTime((t) => {
        if (t === 0) {
          return 99;
        } else {
          return t - 1;
        }
      });
    }, 10);

    // minuteタイマー
    const minTimer = setInterval(() => {
      setMinTime((t) => {
        if (t === 0) {
          stopRecording();
          return 0;
        }
        return t - 1;
      });
    }, 60000);
    setMinTimer(minTimer);
    setMinTime(limitMin - 1);

    setMSecondTimer(msTimer);
    setMSecondSubTime(99);

    // サブタイマーをStart
    const subTimer = setInterval(() => {
      setSubTime((val) => {
        if (val.time === 0) {
          // ユーザの次の動作が何か
          if (val.isStoppingUser) {
            // Stop→Move
            const newSubTime = { time: 1, isStoppingUser: false };
            return newSubTime;
          } else {
            // Move→Stop
            const newSubTime = { time: 0, isStoppingUser: true };
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

    // msサブタイマー
    const msSubTimer = setInterval(() => {
      setMSecondSubTime((t) => {
        if (t === 0) {
          return 99;
        } else {
          return t - 1;
        }
      });
    }, 10);
    setMSecondSubTimer(msTimer);
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
    clearInterval(mSecondSubTimer);
    clearInterval(mSecondTimer);
    clearInterval(minTimer);
    setMinTime(limitMin - 1);
    setMSecondSubTime(100);
    setMSecondTime(100);
  };

  return {
    startRecording,
    stopRecording,
    recordedDataSrc,
    recordedData,
    isRecording,
    videoRef,
    time,
    subTime,
    mSecondSubTime,
    mSecondTime,
    minTime,
    startedAt,
  };
};
