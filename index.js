"use strict";

const videoWidth = 600;
const videoHeight = 500;
const colorLeft = "#FF0000";
const colorRight = "#1E90FF";

const draw = {
  point: (ctx, y, x, r, color) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  },
  keyPoints: (keypoints, minConfidence, ctx, scale = 1) => {
    let leftWrist = keypoints.find(point => point.part === "leftWrist");
    let rightWrist = keypoints.find(point => point.part === "rightWrist");

    if (leftWrist.score > minConfidence) {
      const { y, x } = leftWrist.position;
      draw.point(ctx, y * scale, x * scale, 10, colorLeft);
    }

    if (rightWrist.score > minConfidence) {
      const { y, x } = rightWrist.position;
      draw.point(ctx, y * scale, x * scale, 10, colorRight);
    }
  }
};

// We create an object with the parameters that we want for the model.
const poseNetState = {
  algorithm: "single-pose",
  input: {
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: 513,
    multiplier: 0.75,
    quantBytes: 2
  },
  singlePoseDetection: {
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5
  },
  output: {
    showVideo: true,
    showPoints: true
  }
};

const isMobile = () =>
  /Android/i.test(navigator.userAgent) ||
  /iPhone|iPad|iPod/i.test(navigator.userAgent);

const setupCamera = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );

  const mobile = isMobile();
  const video = document.getElementById("video");
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight
    }
  });
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => resolve(video);
  });
};

const loadVideo = async () => {
  const video = await setupCamera();
  video.play();
  return video;
};

const detectPoseInRealTime = (video, model) => {
  const canvas = document.getElementById("output");
  const ctx = canvas.getContext("2d");
  const flipPoseHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetectionFrame() {
    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;

    switch (poseNetState.algorithm) {
      case "single-pose":
        const pose = await model.estimatePoses(video, {
          flipHorizontal: flipPoseHorizontal,
          decodingMethod: "single-person"
        });
        poses = poses.concat(pose);
        minPoseConfidence = +poseNetState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +poseNetState.singlePoseDetection.minPartConfidence;
        break;
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    if (poseNetState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.restore();
    }

    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        if (poseNetState.output.showPoints) {
          draw.keyPoints(keypoints, minPartConfidence, ctx);
        }
      }
    });
    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
};

async function start() {
  // We load the model.
  let poseNetModel = await posenet.load({
    architecture: poseNetState.input.architecture,
    outputStride: poseNetState.input.outputStride,
    inputResolution: poseNetState.input.inputResolution,
    multiplier: poseNetState.input.multiplier,
    quantBytes: poseNetState.input.quantBytes
  });

  // we instantiate a video stream
  let video;

  try {
    video = await loadVideo();
    detectPoseInRealTime(video, poseNetModel);
  } catch (e) {
    throw e;
  }
}

start().catch(console.error);
