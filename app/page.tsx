"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Terminal, FileText, Download, TrendingUp, ShieldCheck, Video, Award, Code, Mic, Sparkles, ChevronRight, ChevronLeft, Target, Eye, Megaphone, Share2, Palette, Globe, Layers, Crown, Send, MessageSquare, CheckCircle2, Shield, Zap, Mail, Phone, MapPin, ExternalLink, Play, Pause, Volume2, VolumeX } from "lucide-react";

// Custom inline SVG for Facebook icon (prevents Lucide import error)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.6 2h-3.13v12.28a2.53 2.53 0 1 1-2.53-2.53c.27 0 .53.04.78.12V8.7a6.08 6.08 0 0 0-.78-.05 5.66 5.66 0 1 0 5.66 5.66V8.2a8.16 8.16 0 0 0 4.76 1.52V6.59a5.04 5.04 0 0 1-4.76-4.59z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2.13a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26z" />
  </svg>
);

export default function Home() {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgaaqjrr";

  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentSaraIndex, setCurrentSaraIndex] = useState<number>(0);
  const [aboutView, setAboutView] = useState<"founder" | "company">("founder");
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  
  // Video playback & mute states
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({ 1: true, 2: true, 3: true });
  const [isMuted, setIsMuted] = useState<{ [key: number]: boolean }>({ 1: true, 2: true, 3: true });

  // Contact form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionMeta, setSubmissionMeta] = useState<{ name: string; email: string; service: string; ref: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", service: "Digital Marketing", message: "" });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sara's photo profile data
  const saraProfiles = [
    {
      src: "/sar1.jpg",
      title: "Founder & Visionary",
      role: "Sarinova Leadership",
      desc: "As the visionary founder of Sarinova Digital Marketing, Sara leads the strategic trajectory, ensuring every client project achieves maximum market resonance and digital authority.",
    },
    {
      src: "/sar2.jpg",
      title: "Software Engineer",
      role: "Tech & Architecture",
      desc: "Combining technical coding mastery with digital marketing, Sara architected Sarinova's digital infrastructure with high-performance frameworks and clean scalable engineering.",
    },
    {
      src: "/sar3.jpg",
      title: "Brand Ambassador",
      role: "Corporate Relations",
      desc: "Representing high-profile brands with elegance and professional poise, Sara bridges corporate entities with authentic public storytelling and trust.",
    },
    {
      src: "/sar4.jpg",
      title: "Professional Host",
      role: "Media & Events",
      desc: "A charismatic and engaging public speaker and event host, Sara commands stages and digital broadcasts with poise, charm, and articulate communication.",
    },
    {
      src: "/sar5.jpg",
      title: "Creative Director",
      role: "Digital Strategy",
      desc: "Directing cinematic 4K video productions and aesthetic brand layouts, Sara ensures every piece of content meets world-class creative standards.",
    },
  ];

  const handleNextSara = () => {
    setCurrentSaraIndex((prev) => (prev + 1) % saraProfiles.length);
  };

  const handlePrevSara = () => {
    setCurrentSaraIndex((prev) => (prev === 0 ? saraProfiles.length - 1 : prev - 1));
  };

  const togglePlay = (id: number) => {
    const videoElem = document.getElementById(`portfolio-vid-${id}`) as HTMLVideoElement;
    if (videoElem) {
      if (videoElem.paused) {
        videoElem.play();
        setIsPlaying((prev) => ({ ...prev, [id]: true }));
      } else {
        videoElem.pause();
        setIsPlaying((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const toggleMute = (id: number) => {
    const videoElem = document.getElementById(`portfolio-vid-${id}`) as HTMLVideoElement;
    if (videoElem) {
      videoElem.muted = !videoElem.muted;
      setIsMuted((prev) => ({ ...prev, [id]: videoElem.muted }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New Sarinova Contact Form Message - ${formData.service}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      const submissionRef =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID().slice(0, 8).toUpperCase()
          : Math.random().toString(36).slice(2, 10).toUpperCase();

      setSubmissionMeta({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        ref: submissionRef,
      });
      setFormSubmitted(true);
      setFormData({ name: "", email: "", service: "Digital Marketing", message: "" });

      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch {
      setFormError("Message failed to send. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const yearText = new Intl.DateTimeFormat("en", { year: "numeric" }).format();
    setCurrentYear(Number(yearText));

    const handleScroll = () => {
      const sections = ["home", "about", "services", "packages", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const starsCount = 75;
    const stars = Array.from({ length: starsCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.5 ? "#c084fc" : "#a855f7",
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 500);
      gradient.addColorStop(0, "rgba(168, 85, 247, 0.22)");
      gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.09)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 130) {
          star.x -= dx * 0.025;
          star.y -= dy * 0.025;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#a855f7";
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Services Data
  const servicesList = [
    {
      icon: <Megaphone className="w-6 h-6 text-purple-500" />,
      title: "Strategic Digital Marketing",
      desc: "Data-driven campaigns engineered to expand market reach, target high-value demographics, and maximize ROI across digital channels.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-pink-500" />,
      title: "Social Media Management",
      desc: "Comprehensive multi-platform content scheduling, community engagement, and organic growth curation across TikTok, Instagram, and Facebook.",
    },
    {
      icon: <Video className="w-6 h-6 text-indigo-500" />,
      title: "4K Cinematic Production",
      desc: "High-end video production, professional color grading, and dynamic editing pipelines tailored for brand commercials and promotional reels.",
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      title: "Brand Ambassadorship & Hosting",
      desc: "Professional event hosting, brand representation, and public speaking led by Sara Abera to establish supreme corporate authority and trust.",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Web & Digital Architecture",
      desc: "Full-stack web portfolio and landing page development optimized for conversion speed, stunning UI/UX, and seamless responsive performance.",
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: "Creative Content Strategy",
      desc: "Compelling storytelling frameworks, graphic asset design, and multimedia publishing strategies crafted to keep your audience hooked.",
    },
  ];

  // Packages Matrix
  const packagesList = [
    {
      name: "Silver Package",
      badge: "Essential",
      icon: <Shield className="w-7 h-7 text-slate-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />,
      iconBg: "border-slate-500/40 bg-gradient-to-br from-slate-700/60 to-slate-900/90 shadow-slate-900/50",
      price: "20k ETB",
      desc: "Professional starter social media curation and basic community management.",
      contentVolume: "8 content pieces / month",
      platforms: "TikTok",
      graphics: "Standard Support",
      management: "Basic replies & Monthly summary",
      popular: false,
    },
    {
      name: "Gold Package",
      badge: "Most Popular",
      icon: <Zap className="w-7 h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" />,
      iconBg: "border-amber-500/50 bg-gradient-to-br from-amber-600/40 to-amber-950/90 shadow-amber-950/50",
      price: "25k ETB",
      desc: "Accelerated growth package with weekly graphics and active community interaction.",
      contentVolume: "12 content pieces / month",
      platforms: "TikTok, Facebook",
      graphics: "1 per week",
      management: "Comments & DMs, Monthly analytics report",
      popular: true,
    },
    {
      name: "Platinum Package",
      badge: "Elite Dominance",
      icon: <Crown className="w-7 h-7 text-purple-300 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" />,
      iconBg: "border-purple-500/50 bg-gradient-to-br from-purple-600/40 to-indigo-950/90 shadow-purple-950/50",
      price: "30k ETB",
      desc: "Full-scale corporate social management, 4K visual assets, and strategy reviews.",
      contentVolume: "16 content pieces / month",
      platforms: "TikTok, Facebook & Instagram",
      graphics: "2 per week + 4k image",
      management: "Full community management, Monthly strategy review",
      popular: false,
    },
  ];

  // Portfolio Experience Clients Data
  const portfolioClients = [
    {
      id: 1,
      name: "Daros International Hotel",
      category: "Hospitality & Tourism",
      logo: "/img1.jpg",
      video: "/vid1.mp4",
      tiktokUrl: "https://vt.tiktok.com/ZSp2nARKc/",
      desc: "Elevated brand presence and guest engagement through luxury 4K video storytelling and targeted hospitality marketing strategies.",
    },
    {
      id: 2,
      name: "Teramaj Taye Accounting",
      category: "Financial & Corporate",
      logo: "/img2.jpg",
      video: "/vid2.MP4",
      tiktokUrl: "https://vt.tiktok.com/ZSp2nD5Pa/",
      desc: "Built institutional authority and client trust through structured corporate messaging and strategic social media leadership.",
    },
    {
      id: 3,
      name: "Zeriye Fashion",
      category: "Fashion & Lifestyle",
      logo: "/img3.jpg",
      video: "/vid3.MP4",
      tiktokUrl: "https://vt.tiktok.com/ZSp2nrmbp/",
      desc: "Driven high viral audience engagement and aesthetic brand recognition with high-tempo cinematic video productions.",
    },
  ];

  return (
    <main className="relative min-h-screen font-sans selection:bg-purple-600 selection:text-white overflow-hidden bg-[#030712] text-slate-100">
      
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Cyber Grid Lines */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 80%), 
                            linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 50px 50px, 50px 50px"
        }}
      />

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b bg-[#030712]/80 border-slate-800/80">
        <div className="w-full px-8 h-20 flex items-center justify-between">
          
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-purple-500/30 bg-purple-950/40 shadow-lg shadow-purple-950/50 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/sarinova.png"
                alt="Sarinova Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="text-3xl font-extrabold italic tracking-wider bg-gradient-to-r from-purple-600 via-purple-400 to-indigo-500 bg-clip-text text-transparent animate-shimmer-text">
              Sarinova
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {[
              { name: "Home", href: "#home", id: "home" },
              { name: "About", href: "#about", id: "about" },
              { name: "Services", href: "#services", id: "services" },
              { name: "Packages", href: "#packages", id: "packages" },
              { name: "Experience", href: "#portfolio", id: "portfolio" },
              { name: "Contact", href: "#contact", id: "contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-purple-400 font-semibold drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                    : "text-slate-300 hover:text-purple-400"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* HOME / HERO SECTION */}
      <section id="home" className="relative pt-44 pb-24 z-10 min-h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <div className="whitespace-nowrap animate-marquee opacity-[0.07] text-[15vw] font-extrabold italic tracking-widest bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent blur-[1px]">
            SARINOVA DIGITAL MARKETING • SARINOVA DIGITAL MARKETING •
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border text-xs font-mono mb-8 backdrop-blur-md shadow-xl transition-all border-purple-500/40 bg-slate-900/90 text-purple-300 shadow-purple-950/60">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <Terminal className="w-3.5 h-3.5 text-purple-500" />
            <span>SYSTEM_ACTIVE: Digital Growth Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto leading-tight">
            Turn your brand into an engaging{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              digital experience
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal text-slate-400">
            Sarinova Digital Marketing helps businesses build a strong online presence through strategic content, creative storytelling, and purposeful social media management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#packages"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base transition-all shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 hover:scale-105"
            >
              Explore Packages <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border font-semibold text-base transition-all hover:scale-105 backdrop-blur-md border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 mb-16">
            <a
              href="/sarinova.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono transition-all hover:scale-105 shadow-md border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 shadow-purple-950/40"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>View Full Company PDF</span>
            </a>
            <a
              href="/sarinova.pdf"
              download="Sarinova_Company_Profile.pdf"
              title="Download Document"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border transition-all hover:scale-105 border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-purple-400"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl border backdrop-blur-md flex items-center justify-center gap-3 transition-all hover:scale-105 border-slate-800/80 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Targeted Growth</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border backdrop-blur-md flex items-center justify-center gap-3 transition-all hover:scale-105 border-slate-800/80 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">4K UHD</p>
                <p className="text-xs text-slate-400">Content Quality</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border backdrop-blur-md flex items-center justify-center gap-3 transition-all hover:scale-105 border-slate-800/80 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">Verified</p>
                <p className="text-xs text-slate-400">Client Results</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 relative z-10 border-t border-slate-900/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{aboutView === "founder" ? "Founder Showcase" : "Sarinova Enterprise"}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 transition-all duration-500">
              {aboutView === "founder" ? (
                <>Meet the Founder • <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Sara Abera</span></>
              ) : (
                <>About <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Sarinova</span> & Vision</>
              )}
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base transition-all duration-500 text-slate-400">
              {aboutView === "founder" 
                ? "Software Engineer, Brand Ambassador, and Professional Host bridging technical system logic with high-impact public engagement."
                : "Discover our mission, core values, and the robust engineering ecosystem powering modern brands."}
            </p>
          </div>

          <div className="relative overflow-hidden">
            
            {aboutView === "founder" ? (
              <div key="founder-view" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-view-slide">
                
                <div className="p-8 rounded-3xl border backdrop-blur-md lg:col-span-5 shadow-xl border-purple-500/30 bg-slate-900/60 shadow-purple-950/30">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Award className="w-6 h-6 text-purple-500" />
                    <span>Sara Abera</span>
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 transition-all duration-300 text-slate-300">
                    {saraProfiles[currentSaraIndex].desc}
                  </p>

                  <div className="space-y-3 font-mono text-xs mb-8">
                    <div className="p-3 rounded-xl border flex items-center gap-3 border-slate-800 bg-slate-950/60">
                      <Code className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Software Engineering & Architecture</span>
                    </div>
                    <div className="p-3 rounded-xl border flex items-center gap-3 border-slate-800 bg-slate-950/60">
                      <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                      <span>Corporate Brand Ambassadorship</span>
                    </div>
                    <div className="p-3 rounded-xl border flex items-center gap-3 border-slate-800 bg-slate-950/60">
                      <Mic className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Professional Event Hosting</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400">Explore Company View</span>
                    <button
                      onClick={() => setAboutView("company")}
                      aria-label="Slide to Company View"
                      className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
                    >
                      <span>Company Vision</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 flex justify-center relative">
                  <div className="relative w-full max-w-md h-[460px] flex items-center justify-center">
                    
                    <div className="absolute w-[92%] h-[92%] rounded-3xl bg-purple-950/50 border border-purple-500/30 translate-y-6 translate-x-6 scale-95 shadow-2xl blur-[2px] z-0" />
                    <div className="absolute w-[96%] h-[96%] rounded-3xl bg-slate-900/80 border border-slate-800 translate-y-3 translate-x-3 scale-98 shadow-xl z-10" />

                    <div key={currentSaraIndex} className="relative w-full h-full rounded-3xl overflow-hidden border backdrop-blur-md shadow-2xl z-20 animate-card-switch border-purple-500/40 bg-slate-900">
                      
                      <div className="relative h-[340px] w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={saraProfiles[currentSaraIndex].src}
                          alt={saraProfiles[currentSaraIndex].title}
                          fill
                          className="object-contain p-2 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />

                        <button
                          onClick={handlePrevSara}
                          aria-label="Previous Card"
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-600 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 shadow-lg z-30"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextSara}
                          aria-label="Next Card"
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-600 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 shadow-lg z-30"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-mono tracking-widest uppercase backdrop-blur-md shadow-md">
                            // {saraProfiles[currentSaraIndex].role}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 text-left flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-white tracking-wide">
                            {saraProfiles[currentSaraIndex].title}
                          </h4>
                          <p className="text-xs text-purple-400 font-mono mt-0.5">Sara Abera • Sarinova Lead</p>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          {saraProfiles.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentSaraIndex(i)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${currentSaraIndex === i ? "w-6 bg-purple-500" : "w-1.5 bg-slate-700"}`}
                              aria-label={`Slide ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            ) : (
              <div key="company-view" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-view-slide">
                
                <div className="lg:col-span-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    
                    <div className="p-8 rounded-3xl border backdrop-blur-md shadow-xl border-purple-500/30 bg-slate-900/60 shadow-purple-950/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500">
                          <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">Our Mission</h3>
                      </div>
                      <p className="text-base leading-relaxed text-slate-300">
                        To empower ambitious enterprises and brands across Ethiopia and beyond with elite digital marketing strategies, flawless 4K video storytelling, and robust technical infrastructure.
                      </p>
                    </div>

                    <div className="p-8 rounded-3xl border backdrop-blur-md shadow-xl border-indigo-500/30 bg-slate-900/60 shadow-indigo-950/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                          <Eye className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">Our Vision</h3>
                      </div>
                      <p className="text-base leading-relaxed text-slate-300">
                        To be the premier digital growth engine in East Africa, merging software engineering precision with world-class creative media execution.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setAboutView("founder")}
                      aria-label="Back to Founder View"
                      className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-xs transition-all shadow-lg hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      <span>Back to Founder</span>
                    </button>
                    <span className="text-xs font-mono text-purple-400">// SARINOVA DIGITAL MARKETING ECOSYSTEM</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 relative z-10 border-t border-slate-900/80 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              What <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Sarinova</span> Offers
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400">
              Comprehensive digital marketing and technological solutions tailored to elevate your brand presence and market authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/15 border-slate-800 bg-slate-900/60 hover:border-purple-500/50"
              >
                <div className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 border-slate-700 bg-slate-950/80">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-wide group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {service.desc}
                </p>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-transparent rounded-tr-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section id="packages" className="py-32 relative z-10 border-t border-slate-900/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              <span>Investment Tiers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Our <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Packages</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400">
              Choose the ideal content volume and management tier tailored for your brand growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packagesList.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-3xl border backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  pkg.popular
                    ? "border-purple-500 bg-slate-900/90 shadow-purple-600/20 shadow-2xl lg:-translate-y-4"
                    : "border-slate-800 bg-slate-900/50 hover:border-purple-500/40"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono tracking-widest uppercase shadow-lg">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center backdrop-blur-md shadow-xl mb-4 transition-transform duration-300 hover:scale-110 ${pkg.iconBg}`}>
                      {pkg.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 font-mono text-center">{pkg.desc}</p>
                  </div>

                  <div className="text-center mb-8 pb-6 border-b border-slate-800">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-indigo-400 bg-clip-text text-transparent">{pkg.price}</span>
                    <span className="text-xs text-slate-400 font-mono block mt-1">/ month</span>
                  </div>

                  <div className="space-y-5 mb-8 text-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                      <span className="text-slate-400 font-mono text-xs">Content Volume</span>
                      <span className="font-semibold text-white text-right">{pkg.contentVolume}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                      <span className="text-slate-400 font-mono text-xs">Platforms</span>
                      <span className="font-semibold text-white text-right">{pkg.platforms}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                      <span className="text-slate-400 font-mono text-xs">Graphics</span>
                      <span className="font-semibold text-white text-right">{pkg.graphics}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                      <span className="text-slate-400 font-mono text-xs">Management</span>
                      <span className="font-semibold text-white text-right text-xs max-w-[180px]">{pkg.management}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`w-full py-4 rounded-xl font-semibold text-sm transition-all text-center shadow-lg block ${
                    pkg.popular
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
                      : "border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  Select {pkg.name}
                </a>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EXPERIENCE / PORTFOLIO SECTION */}
      <section id="portfolio" className="py-32 relative z-10 border-t border-slate-900/80 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Client <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Showcase</span> & Experience
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400">
              Explore live campaigns created and executed by Sarinova. Watch our cinematic vertical productions or view them directly on TikTok.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioClients.map((client) => (
              <div
                key={client.id}
                className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 flex flex-col justify-between"
              >
                <div>
                  <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 p-1 shrink-0">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug group-hover:text-purple-400 transition-colors">
                          {client.name}
                        </h3>
                        <span className="text-xs text-purple-400 font-mono">// {client.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-80 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.25),transparent_60%)] pointer-events-none" />

                    <video
                      id={`portfolio-vid-${client.id}`}
                      src={client.video}
                      className="relative h-full w-auto object-contain z-10"
                      preload="metadata"
                      poster={client.logo}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 pointer-events-none z-20" />

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 border border-purple-500/30 backdrop-blur-md shadow-lg">
                      <button
                        onClick={() => togglePlay(client.id)}
                        className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-1 text-xs font-mono"
                        title={isPlaying[client.id] ? "Pause Video" : "Play Video"}
                      >
                        {isPlaying[client.id] ? <Pause className="w-3.5 h-3.5 fill-purple-400" /> : <Play className="w-3.5 h-3.5 fill-purple-400" />}
                        <span>{isPlaying[client.id] ? "Pause" : "Play"}</span>
                      </button>

                      <div className="w-[1px] h-3 bg-slate-700" />

                      <button
                        onClick={() => toggleMute(client.id)}
                        className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-1 text-xs font-mono"
                        title={isMuted[client.id] ? "Unmute Sound" : "Mute Sound"}
                      >
                        {isMuted[client.id] ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{isMuted[client.id] ? "Sound Off" : "Sound On"}</span>
                      </button>
                    </div>

                  </div>

                  <div className="p-6">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {client.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={client.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl border border-purple-500/40 bg-purple-950/40 hover:bg-purple-600 hover:border-purple-500 text-purple-300 hover:text-white font-medium text-xs font-mono transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn"
                  >
                    <span>View Live on TikTok</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 relative z-10 border-t border-slate-900/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Let's Build Together</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Get in <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">Touch</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400">
              Ready to scale your digital presence? Send us a message or contact us directly to initiate your brand strategy consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Contact Info & Social Pill Buttons */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-8 rounded-3xl border backdrop-blur-md border-slate-800 bg-slate-900/60 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <span>Sarinova Contact Hub</span>
                </h3>

                <div className="space-y-6 text-sm">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Headquarters</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">Arba Minch, Ethiopia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email Us</h4>
                      <a href="mailto:lillyweyni@gmail.com" className="text-purple-400 hover:underline text-xs">
                        lillyweyni@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Direct Consultation</h4>
                      <a href="tel:+251901055934" className="text-slate-300 hover:text-purple-400 text-xs">
                        +251-901-055-934
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Styled Social Media Pill Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* TikTok Pill */}
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-cyan-600 transition-all">
                    <TiktokIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase">TIKTOK</span>
                    <span className="text-[10px] text-slate-400 font-mono">Short-form Content</span>
                  </div>
                </a>

                {/* Instagram Pill */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-500/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-600 group-hover:to-purple-600 transition-all">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold tracking-wider text-white group-hover:text-pink-400 transition-colors uppercase">INSTAGRAM</span>
                    <span className="text-[10px] text-slate-400 font-mono">Visual Stories</span>
                  </div>
                </a>

                {/* Facebook Pill */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-600/60 hover:shadow-lg hover:shadow-blue-600/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-blue-700 transition-all">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold tracking-wider text-white group-hover:text-blue-500 transition-colors uppercase">FACEBOOK</span>
                    <span className="text-[10px] text-slate-400 font-mono">Community Page</span>
                  </div>
                </a>

                {/* Telegram Pill */}
                <a
                  href="https://t.me/SarinovaDigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-400/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-sky-500 transition-all">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold tracking-wider text-white group-hover:text-sky-400 transition-colors uppercase">TELEGRAM</span>
                    <span className="text-[10px] text-slate-400 font-mono">@SarinovaDigital</span>
                  </div>
                </a>

              </div>

            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl border backdrop-blur-md border-purple-500/30 bg-slate-900/80 shadow-2xl shadow-purple-950/40 relative">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Interested Package / Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                    >
                      <option value="Silver Package">Silver Package (20k ETB)</option>
                      <option value="Gold Package">Gold Package (25k ETB)</option>
                      <option value="Platinum Package">Platinum Package (30k ETB)</option>
                      <option value="4K Video Production">4K Cinematic Video Production</option>
                      <option value="Brand Ambassadorship">Brand Ambassadorship & Hosting</option>
                      <option value="Custom Web Portal">Custom Web Portal Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Project Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your brand goals, timelines, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {formError && (
                    <p className="text-xs text-rose-400 font-mono">{formError}</p>
                  )}

                </form>

            </div>

          </div>

        </div>
      </section>

      {formSubmitted && submissionMeta && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#030712]/75 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-slate-900/95 p-8 text-center shadow-2xl shadow-emerald-500/15">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Your Message Has Been Delivered</h3>
            <p className="mt-2 text-sm text-slate-300">
              Thank you, {submissionMeta.name}. Your request has been successfully sent to our team.
            </p>
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-left text-xs font-mono text-slate-300 space-y-2">
              <p>Ref: {submissionMeta.ref}</p>
              <p>Service: {submissionMeta.service}</p>
              <p>Sender: {submissionMeta.email}</p>
            </div>
            <p className="mt-4 text-xs text-slate-400">We will review your message and get back to you as soon as possible.</p>
            <button
              type="button"
              onClick={() => {
                setFormSubmitted(false);
                setSubmissionMeta(null);
              }}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950/90 relative z-10 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 overflow-hidden rounded-lg border border-purple-500/30 bg-purple-950">
              <Image src="/sarinova.png" alt="Sarinova Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-slate-300 font-bold italic tracking-wider">SARINOVA DIGITAL MARKETING</span>
          </div>

          <p>© {currentYear ?? ""} Sarinova Digital Marketing. All rights reserved.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <span>•</span>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <span>•</span>
            <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
          </div>

        </div>
      </footer>

    </main>
  );
}