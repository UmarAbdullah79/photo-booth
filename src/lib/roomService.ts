/**
 * Two Hearts Photo Booth - Room Service Boundary
 * 
 * Provides a typed interface for room creation and signaling coordination.
 * If a backend room service endpoint is configured (e.g. via NEXT_PUBLIC_ROOM_SERVICE_URL),
 * it coordinates with the backend API.
 * When the backend infrastructure is not yet implemented or connected,
 * it returns a clean, typed status gracefully without generating fake room codes or simulated success.
 */

export interface CreateRoomParams {
  hostNickname: string;
  cameraReady: boolean;
  micReady: boolean;
  lightingPreference: "auto" | "warm";
}

export interface RoomSessionData {
  roomId: string;
  roomCode: string; // 6-digit room code
  hostNickname: string;
  createdAt: string;
}

export type RoomCreationResult =
  | {
      status: "success";
      data: RoomSessionData;
    }
  | {
      status: "backend_unavailable";
      message: string;
      details?: string;
    }
  | {
      status: "error";
      message: string;
    };

/**
 * Creates a new photo booth room via the backend service boundary.
 */
export async function createRoom(
  params: CreateRoomParams
): Promise<RoomCreationResult> {
  const backendBaseUrl = process.env.NEXT_PUBLIC_ROOM_SERVICE_URL;

  // If a real backend server URL is configured, make the live network call
  if (backendBaseUrl) {
    try {
      const response = await fetch(`${backendBaseUrl.replace(/\/$/, "")}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: params.hostNickname.trim(),
          cameraEnabled: params.cameraReady,
          micEnabled: params.micReady,
          lighting: params.lightingPreference,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          `Backend room creation failed with status ${response.status}`;
        return {
          status: "error",
          message: errorMessage,
        };
      }

      const data = (await response.json()) as RoomSessionData;
      return {
        status: "success",
        data,
      };
    } catch (err) {
      return {
        status: "backend_unavailable",
        message: "Unable to reach the room creation server.",
        details: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // When no backend server URL is configured in the environment:
  // Return explicit typed status that the room-creation backend service is not yet deployed/connected.
  return {
    status: "backend_unavailable",
    message: "Room-creation backend service is not yet connected.",
    details:
      "Frontend room configuration is complete and ready. The room-creation backend service / signaling server is awaiting deployment. Once connected, a 6-digit room code will be generated and you will be routed to the room lobby.",
  };
}
