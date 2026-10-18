// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useEffect, useRef, useState } from "react";
// import type Peer from "peerjs";

// export default function CameraCapture() {
//   const localRef = useRef<HTMLVideoElement>(null);
//   const remoteRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const peerRef = useRef<Peer | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const [myId, setMyId] = useState("");
//   const [remoteId, setRemoteId] = useState("");

//   useEffect(() => {
//     let destroyed = false;

//     (async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: { echoCancellation: true, noiseSuppression: true },
//       });
//       if (destroyed) return stream.getTracks().forEach((t) => t.stop());
//       streamRef.current = stream;
//       if (localRef.current) localRef.current.srcObject = stream;

//       // PeerJS touches `window`, so import it only on the client
//       const { Peer } = await import("peerjs");
//       const peer = new Peer();
//       peerRef.current = peer;

//       peer.on("open", (id) => setMyId(id));

//       // Incoming call: answer with our stream
//       peer.on("call", (call) => {
//         call.answer(stream);
//         call.on("stream", (remote) => {
//           if (remoteRef.current) remoteRef.current.srcObject = remote;
//         });
//       });
//     })();

//     return () => {
//       destroyed = true;
//       peerRef.current?.destroy();
//       streamRef.current?.getTracks().forEach((t) => t.stop());
//     };
//   }, []);

//   function callPeer() {
//     if (!peerRef.current || !streamRef.current) return;
//     const call = peerRef.current.call(remoteId, streamRef.current);
//     call.on("stream", (remote) => {
//       if (remoteRef.current) remoteRef.current.srcObject = remote;
//     });
//   }

//   // Capture from either video element
//   function capture(source: "local" | "remote") {
//     const video = source === "local" ? localRef.current : remoteRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas || !video.videoWidth) return;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext("2d")?.drawImage(video, 0, 0);
//     canvas.toBlob(
//       (blob) => {
//         /* upload or preview the blob */
//       },
//       "image/jpeg",
//       0.9,
//     );
//   }

//   return (
//     <div className="grid place-items-center">
//       <p>
//         Your ID: <b>{myId || "connecting..."}</b>
//       </p>
//       <input
//         value={remoteId}
//         onChange={(e) => setRemoteId(e.target.value)}
//         placeholder="Friend's ID"
//       />
//       <button onClick={callPeer}>Call</button>

//       <video ref={localRef} autoPlay playsInline muted style={{ width: 240 }} />
//       <video ref={remoteRef} autoPlay playsInline style={{ width: 480 }} />
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       <button onClick={() => capture("local")}>Capture me</button>
//       <button onClick={() => capture("remote")}>Capture them</button>
//     </div>
//   );
// }
