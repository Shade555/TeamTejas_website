import React from "react";
import GlassSurface from "../../../components/GlassSurface";

export default function Test() {
	// Change this value to move the background image up/down
	const testimoBgY = 0; // px
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",   // vertical centering
				alignItems: "center",       // horizontal centering
				gap: 40,
				padding: 40,
				background: "#111",
				minHeight: "100vh",
				color: "white",
				textAlign: "center",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* testimo_bg background image with translateY */}
			<img
				src={"/testimonials/testimo_bg.png"}
				alt="testimo_bg"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					objectFit: "cover",
					zIndex: 0,
					transform: `translateY(${testimoBgY}px)`,
					pointerEvents: "none",
					opacity: 0.25,
				}}
			/>
			{/* very opaque black overlay above image */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					background: "rgba(0,0,0,0.1)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>
			<h1>GlassSurface Test</h1>

			{/* --- STRONG VISIBLE DISTORTION TEST --- */}
			<GlassSurface
				width={350}
				height={280}
				borderRadius={24}
				displace={10}
				distortionScale={120}
				redOffset={5}
				greenOffset={15}
				blueOffset={25}
				brightness={40}
				opacity={0.85}
				mixBlendMode="screen"
			>
				<div style={{ padding: 20 }}>
					<h2 style={{ margin: 0 }}>Distortion Test</h2>
					<p style={{ margin: 0 }}>You should see chromatic + glass warp.</p>
				</div>
			</GlassSurface>

			{/* --- WEAK DISTORTION / DEFAULT TEST --- */}
			<GlassSurface width={300} height={200} borderRadius={20}>
				<div style={{ padding: 20 }}>Default GlassSurface</div>
			</GlassSurface>

			{/* --- RANDOM STRETCH TEST --- */}
			<GlassSurface
				width={400}
				height={160}
				borderRadius={16}
				displace={6}
				distortionScale={80}
				mixBlendMode="overlay"
			>
				<div style={{ padding: 20 }}>Overlay Mode</div>
			</GlassSurface>
		</div>
	);
}
