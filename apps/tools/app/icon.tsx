import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          border: "1.5px solid rgba(124,106,247,0.5)",
          background: "rgba(124,106,247,0.15)",
          backgroundColor: "#07070e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Terminal icon: >_ */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <polyline points="4 17 10 11 4 5" stroke="#7c6af7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="19" x2="20" y2="19" stroke="#7c6af7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
