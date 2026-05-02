<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Architect OS - Ethereal Nodes</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#f8d8ff",
                    "on-primary-fixed-variant": "#004f54",
                    "on-error-container": "#ffdad6",
                    "tertiary": "#e1ffd1",
                    "tertiary-container": "#33fb0a",
                    "surface-container-low": "#151c29",
                    "tertiary-fixed": "#79ff5b",
                    "surface-bright": "#333948",
                    "error-container": "#93000a",
                    "background": "#0d1321",
                    "tertiary-fixed-dim": "#2ae500",
                    "primary-fixed-dim": "#00dbe9",
                    "on-surface": "#dce2f5",
                    "on-secondary-fixed-variant": "#74009f",
                    "surface-container-lowest": "#070e1b",
                    "secondary-container": "#b600f8",
                    "on-tertiary-fixed-variant": "#095300",
                    "outline": "#849495",
                    "on-secondary-fixed": "#320047",
                    "on-secondary-container": "#fff6fc",
                    "on-primary-fixed": "#002022",
                    "primary-fixed": "#7df4ff",
                    "on-background": "#dce2f5",
                    "surface-dim": "#0d1321",
                    "on-tertiary": "#053900",
                    "surface-variant": "#2e3543",
                    "on-primary": "#00363a",
                    "outline-variant": "#3b494b",
                    "inverse-primary": "#006970",
                    "surface-tint": "#00dbe9",
                    "secondary": "#ebb2ff",
                    "error": "#ffb4ab",
                    "surface-container": "#19202d",
                    "primary-container": "#00f0ff",
                    "secondary-fixed-dim": "#ebb2ff",
                    "surface-container-highest": "#2e3543",
                    "on-error": "#690005",
                    "inverse-surface": "#dce2f5",
                    "on-tertiary-fixed": "#022100",
                    "on-tertiary-container": "#106e00",
                    "on-secondary": "#520072",
                    "primary": "#dbfcff",
                    "inverse-on-surface": "#2a303f",
                    "on-primary-container": "#006970",
                    "surface": "#0d1321",
                    "surface-container-high": "#232a38",
                    "on-surface-variant": "#b9cacb"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "node-gutter": "2rem",
                    "container-padding": "1.5rem",
                    "panel-width": "320px",
                    "grid-unit": "8px"
            },
            "fontFamily": {
                    "headline-xl": ["Space Grotesk"],
                    "stat-value": ["Space Grotesk"],
                    "mono-label": ["Space Grotesk"],
                    "headline-lg": ["Space Grotesk"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "headline-xl": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                    "stat-value": ["24px", { "lineHeight": "1.0", "fontWeight": "700" }],
                    "mono-label": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.1em", "fontWeight": "500" }],
                    "headline-lg": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
                    "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
            }
          }
        }
      }
    </script>
<style>
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Ethereal background */
        .ethereal-bg {
            background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, rgba(13, 19, 33, 1) 70%);
            background-size: 200% 200%;
        }

        /* Connecting lines for the graph */
        .node-line {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, rgba(0, 240, 255, 0.5) 0%, rgba(235, 178, 255, 0.5) 100%);
            z-index: 0;
            opacity: 0.4;
        }

        .line-1 { width: 150px; top: 50%; left: 50%; transform-origin: left center; transform: rotate(-30deg); }
        .line-2 { width: 120px; top: 50%; left: 50%; transform-origin: left center; transform: rotate(45deg); }
        .line-3 { width: 180px; top: 50%; left: 50%; transform-origin: left center; transform: rotate(160deg); }
        .line-4 { width: 140px; top: 50%; left: 50%; transform-origin: left center; transform: rotate(-140deg); }
        
        .line-1-1 { width: 80px; top: 30%; left: 65%; transform-origin: left center; transform: rotate(-10deg); }
        .line-3-1 { width: 90px; top: 60%; left: 25%; transform-origin: left center; transform: rotate(200deg); }

        .hover-trigger:hover .hover-panel {
            opacity: 1;
            visibility: visible;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen ethereal-bg overflow-hidden relative">
<!-- Ethereal Grid Lines Background -->
<div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>
<!-- TopNavBar JSON Component -->
<nav class="fixed top-0 w-full z-50 bg-slate-950/30 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-16 flex justify-between items-center px-8 w-full max-w-none">
<div class="text-xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] cursor-pointer active:scale-95">ARCHITECT_OS</div>
<div class="hidden md:flex gap-8 items-center h-full">
<a class="font-['Space_Grotesk'] tracking-widest uppercase text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors h-full flex items-center px-2 hover:bg-cyan-500/10 transition-all duration-300" href="#">Experience</a>
<a class="font-['Space_Grotesk'] tracking-widest uppercase text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors h-full flex items-center px-2 hover:bg-cyan-500/10 transition-all duration-300" href="#">Skills</a>
<a class="font-['Space_Grotesk'] tracking-widest uppercase text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors h-full flex items-center px-2 hover:bg-cyan-500/10 transition-all duration-300" href="#">Projects</a>
<a class="font-['Space_Grotesk'] tracking-widest uppercase text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors h-full flex items-center px-2 hover:bg-cyan-500/10 transition-all duration-300" href="#">Contact</a>
</div>
<div class="flex gap-4">
<button class="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer active:scale-95 hover:bg-cyan-500/10 transition-all duration-300 p-2 rounded-full">
<span class="material-symbols-outlined" data-icon="hub">hub</span>
</button>
<button class="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer active:scale-95 hover:bg-cyan-500/10 transition-all duration-300 p-2 rounded-full">
<span class="material-symbols-outlined" data-icon="terminal">terminal</span>
</button>
</div>
</nav>
<!-- Main Content Canvas (The Graph) -->
<main class="relative w-full h-screen pt-16 flex items-center justify-center z-10">
<!-- Lines -->
<div class="node-line line-1"></div>
<div class="node-line line-2"></div>
<div class="node-line line-3"></div>
<div class="node-line line-4"></div>
<!-- Central Node -->
<div class="absolute z-20 hover-trigger cursor-pointer flex flex-col items-center">
<div class="w-32 h-32 rounded-full border border-primary-container p-2 shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-surface-container-lowest/50 backdrop-blur-md relative group">
<div class="absolute inset-0 rounded-full border border-primary-container/30 animate-ping opacity-20"></div>
<img alt="Avatar" class="w-full h-full rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" data-alt="portrait of a man with short hair looking confidently at the camera in dramatic studio lighting with blue gel accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjAV21JpcJnuP5UPic4yxL6YmqYqAODongYPnOoXlK3QlnAud5X2yva2MJgfBNBCvRlxNLKVGSvTGt8ero6YJ7vnUgexpwpNMXNrhn9Wzth00fNVP01PKpYNX-1RhAYrktqC6bDpWLTENwPeFlIpn8kaczE7kL1tJKZOx47leO47rTc039IFisF4116zEnBmJIMvh7LDAvt8LZKK0yAnJZwlHQtp4M-7EMpsnBUELPUXIRQf9Nvuc91YO5a1M_rSSiCKJUVr10CmZB"/>
</div>
<div class="mt-4 text-center">
<h1 class="font-headline-lg text-headline-lg text-primary-fixed drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">System Architect</h1>
<p class="font-mono-label text-mono-label text-primary-fixed/60 mt-2 tracking-widest uppercase">Technical Lead</p>
</div>
</div>
<!-- Node 1: Architecture -->
<div class="absolute z-20 hover-trigger cursor-pointer" style="top: 20%; left: 65%;">
<div class="w-16 h-16 rounded-full border border-secondary p-1 shadow-[0_0_20px_rgba(235,178,255,0.15)] bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center group hover:border-secondary-fixed hover:shadow-[0_0_30px_rgba(235,178,255,0.4)] transition-all">
<span class="material-symbols-outlined text-secondary-fixed group-hover:text-white transition-colors" data-icon="architecture">architecture</span>
</div>
<p class="font-mono-label text-xs text-secondary/60 mt-2 text-center absolute -bottom-6 w-full uppercase tracking-wider">Architecture</p>
<!-- Hover Panel -->
<div class="hover-panel absolute opacity-0 invisible top-0 left-full ml-4 w-[280px] bg-surface-container/80 backdrop-blur-[20px] border border-secondary/30 rounded-lg p-container-padding transition-all duration-300 z-50">
<h3 class="font-headline-lg text-sm text-secondary-fixed border-b border-secondary/20 pb-2 mb-3">Distributed Systems</h3>
<p class="font-body-md text-sm text-on-surface-variant">Designing resilient, highly available microservices architectures for enterprise scale data processing.</p>
</div>
</div>
</main>
<!-- Footer JSON Component -->
<footer class="fixed bottom-0 w-full bg-transparent py-8 border-t border-cyan-900/30 flex flex-col md:flex-row justify-between items-center px-12 gap-4 z-50">
<div class="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-cyan-500/40">
            © 2024 SYSTEM_ARCHITECT // CONNECTION_ESTABLISHED
        </div>
<div class="flex gap-6">
<a class="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-slate-600 hover:text-cyan-400 transition-colors transition-opacity duration-500" href="#">Github</a>
<a class="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-slate-600 hover:text-cyan-400 transition-colors transition-opacity duration-500" href="#">LinkedIn</a>
<a class="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-slate-600 hover:text-cyan-400 transition-colors transition-opacity duration-500" href="#">Documentation</a>
</div>
</footer>
</body></html>