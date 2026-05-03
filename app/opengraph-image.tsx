import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTQ.ttf",
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 40%, #0d1a2d 0%, #070e1b 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.10) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Signature AR */}
      <div
        style={{
          fontSize: "200px",
          fontFamily: "'Dancing Script', cursive",
          color: "#00f0ff",
          textShadow:
            "0 0 40px rgba(0,240,255,0.35), 0 0 80px rgba(0,240,255,0.12)",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        AR
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: "42px",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#dce2f5",
          marginBottom: "10px",
        }}
      >
        Abdul Rafi Salleh
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "#b9cacb",
        }}
      >
        Ops-Tech Lead
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          width: "120px",
          height: "2px",
          background: "#00f0ff",
          opacity: 0.6,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Dancing Script",
          data: font,
          style: "normal",
        },
      ],
    },
  );
}

