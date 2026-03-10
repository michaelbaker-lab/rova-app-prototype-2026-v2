import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Radio,
  Search,
  Play,
  Pause,
  Share2,
  Bookmark,
  ChevronLeft,
  MoreHorizontal,
  Music,
  Zap,
  MessageCircle,
  Download,
  Shuffle,
  Tv,
  Mic,
  Send,
  ShoppingBag,
  Ticket,
  Trophy,
  Clock,
  Cast,
  Plus,
  Check,
  Heart,
  X,
  Calendar,
  Gift,
  Tag,
  Newspaper,
  MapPin,
  ChevronDown,
  ChevronUp,
  User,
  Settings,
  Mail,
  Phone,
  LogOut,
  ChevronRight,
  Bell,
  Info,
} from "lucide-react";

// --- CONSTANTS ---
const DEFAULT_FALLBACK_IMAGE =
  "https://cdn.aptoide.com/imgs/f/2/8/f282ba1867d3b1de3aad11f390d24f21_icon.png";

const NEWS_CATEGORIES = [
  "All",
  "News",
  "Sport",
  "Entertainment",
  "Lifestyle",
  "Business",
  "Politics",
  "Food & Drink",
  "Movies",
];

// --- CONTENT POOLS ---

const RAW_ARTICLES = [
  {
    id: "a0",
    type: "article",
    title:
      "James Cameron dubs emotional Kiwi reporter 'perfect test subject' for Avatar",
    subtitle: "Monika Barton • rova",
    tags: ["AVATAR", "MOVIES"],
    image:
      "https://deadline.com/wp-content/uploads/2019/11/avatar-scaled-2560.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "READ FULL STORY",
    content:
      "Oscar-winning director James Cameron was thrilled to hear that a Kiwi reporter cried her eyes out during the latest Avatar film, 'Fire and Ash'.",
    likes: 1250,
  },
  {
    id: "a1",
    type: "article",
    title: "Sit down, be humble: Kendrick kills Drake with FOURTH diss track",
    subtitle: "3 mins ago • Sophie van Soest",
    tags: ["HIP HOP", "DRAMA"],
    image:
      "https://cdn.apollo.audio/one/media/67a9/d509/21f1/f16e/4738/dd12/Kendrick-Lamar.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "READ MORE",
    content:
      "Kendrick Lamar has just dropped his fourth diss track aimed at Drake, and the internet is absolutely losing its mind.",
    likes: 3420,
  },
  {
    id: "a2",
    type: "article",
    title: "The real-life Martha from Baby Reindeer went live on YouTube",
    subtitle: "Monika Barton",
    tags: ["NETFLIX", "VIRAL"],
    image:
      "https://live-production.wcms.abc-cdn.net.au/6ef3aafda6c4cc45b4ac36a889054e1f?auto=format&fit=crop&w=800&q=80",
    cta: "READ MORE",
    content:
      "In a twist stranger than fiction, the woman alleged to be the real-life Martha has appeared on Piers Morgan Uncensored.",
    likes: 856,
  },
  {
    id: "a3",
    type: "article",
    title: "Cyclone Recovery: East Coast roads finally reopen",
    subtitle: "Newshub",
    tags: ["NEWS", "NZ"],
    image:
      "https://images.unsplash.com/photo-1599236703533-e91b6441334c?auto=format&fit=crop&w=800&q=80",
    cta: "READ REPORT",
    content:
      "Vital connections have been restored to isolated communities on the East Coast today.",
    likes: 124,
  },
  {
    id: "a4",
    type: "article",
    title: "All Blacks squad named: The surprises you didn't see coming",
    subtitle: "Sport • 10m ago",
    tags: ["SPORT", "RUGBY"],
    image:
      "https://images.ctfassets.net/r65x6q43xsmv/7KKFjummyyX0gNWKXVtvdt/75257432b790a0e99228f287da10bec5/allblacks2025squad-HERO.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "FULL SQUAD",
    content: "Razor has made some bold calls in his latest squad announcement.",
    likes: 45,
  },
  {
    id: "a5",
    type: "article",
    title: "Auckland's Best New Eats for 2025",
    subtitle: "Lifestyle Guide",
    tags: ["FOOD", "AUCKLAND"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    cta: "SEE LIST",
    content:
      "From smash burgers to fine dining, here is where you need to be eating this month.",
    likes: 890,
  },
];

const RAW_VIDEOS = [
  {
    id: "v_rock",
    type: "video",
    title: "Creech's Christmas tree joke",
    subtitle: "The Rock FM",
    tags: ["FUNNY", "CHRISTMAS"],
    videoUrl: "https://d2kt1sldfzidnv.cloudfront.net/playout/VID08778.m3u8",
    cta: "WATCH MORE",
    content: "One month til Christmas... Keep ya trees away from Creech.",
    likes: 1205,
  },
  {
    id: "v_mai",
    type: "video",
    title: "Nickson's savage secret santa gifts for web girl Arju",
    subtitle: "Mai FM",
    tags: ["FUNNY", "CHRISTMAS"],
    videoUrl: "https://d2kt1sldfzidnv.cloudfront.net/playout/VID09051.m3u8",
    cta: "WATCH FULL",
    content: "i'm definitely taking nickson to hr after this",
    likes: 0,
  },
  {
    id: "v_george",
    type: "video",
    title: "Sin attempts a prank call",
    subtitle: "George FM",
    tags: ["FUNNY", "PRANK", "FAIL"],
    videoUrl: "https://d2kt1sldfzidnv.cloudfront.net/playout/VID09066.m3u8",
    cta: "JOIN IN",
    content: "Day one of Sin's Big Prank and we've got some work to do.",
    likes: 420,
  },
  {
    id: "v_edge",
    type: "video",
    title: "Hit The Spot: Taylor Swift 'Love Story'",
    subtitle: "The Edge",
    tags: ["VIRAL", "REACT"],
    videoUrl: "https://d2kt1sldfzidnv.cloudfront.net/playout/VID07661.m3u8",
    cta: "SEE MORE",
    content: "Beat magician!!",
    likes: 156,
  },
  {
    id: "v_more",
    type: "video",
    title: "WHO came up with these place names?",
    subtitle: "More FM",
    tags: ["FUNNY", "RUDE"],
    videoUrl: "https://d2kt1sldfzidnv.cloudfront.net/playout/VID09055.m3u8",
    cta: "WATCH VIDEO",
    content: "Its giving last week vibes.",
    likes: 95,
  },
];

const RAW_EVENTS = [
  {
    id: "e1",
    type: "event",
    title: "Rhythm and Vines 2025",
    subtitle: "Waiohika Estate, Gisborne",
    region: "Gisborne",
    tags: ["Music", "Festival"],
    image:
      "https://cdn.prod.website-files.com/68abb6890e1db08b0e362686/68abb6890e1db08b0e362f66_ADM_3416-for_web-v4.webp?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cta: "GET TICKETS",
    content:
      "New Zealand's premier 3-day music and camping festival at the beautiful Waiohika Estate.",
    likes: 2100,
  },
  {
    id: "e2",
    type: "event",
    title: "You little ripper! Fisher coming back to NZ",
    subtitle: "Hagley Park, Christchurch",
    region: "Canterbury",
    tags: ["Music", "Electronic"],
    image:
      "https://images.squarespace-cdn.com/content/v1/6522859ed74b6e6f6d350faf/3617a31c-5955-4baf-acce-caa3ea61f6c8/fisher.png?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cta: "GET TICKETS",
    content:
      "The biggest house party of the summer is coming. FISHER returns to NZ for two massive shows.",
    likes: 1850,
  },
  {
    id: "e3",
    type: "event",
    title: "Laneway Festival 2026",
    subtitle: "Western Springs, Auckland",
    region: "Auckland",
    tags: ["Music", "Indie"],
    image:
      "https://cdn.aucklandunlimited.com/stadiums/assets/media/2025-02-06-people-auckland-chontallemusson-5.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "LINEUP INFO",
    content:
      "The indie festival of the year returns to its new home at Western Springs with a massive international lineup.",
    likes: 940,
  },
  {
    id: "e4",
    type: "event",
    title: "Armageddon Expo",
    subtitle: "Sky Stadium, Wellington",
    region: "Wellington",
    tags: ["Arts", "Family", "Geek"],
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80",
    cta: "BUY TICKETS",
    content:
      "Comics, gaming, cosplay and stars. Don't miss the biggest pop culture event in NZ.",
    likes: 0,
  },
  {
    id: "e5",
    type: "event",
    title: "Bluff Oyster Festival",
    subtitle: "Bluff, Southland",
    region: "Southland",
    tags: ["Family", "Food"],
    image:
      "https://images.unsplash.com/photo-1625937759422-426d03b0d634?auto=format&fit=crop&w=800&q=80",
    cta: "LEARN MORE",
    content:
      "Get shucking! The world famous festival is back for another year of seafood and entertainment.",
    likes: 320,
  },
  {
    id: "e6",
    type: "event",
    title: "Sunset Guided Tour",
    subtitle: "Stonehenge Aotearoa, Wairarapa",
    region: "Wellington",
    tags: ["Family", "Arts"],
    image:
      "https://images.unsplash.com/photo-1534234828563-025317351679?auto=format&fit=crop&w=800&q=80",
    cta: "BOOK NOW",
    content:
      "Experience the magic of Stonehenge Aotearoa at sunset with a special guided tour.",
    likes: 45,
  },
  {
    id: "e7",
    type: "event",
    title: "Kids K-Pop Demon Hunters Karaoke",
    subtitle: "Galaxy Arcade, Christchurch",
    region: "Canterbury",
    tags: ["Family", "Music", "Kids"],
    image:
      "https://www.voquent.com/blog/wp-content/uploads/2025/09/KPop-Demon-Hunters-article-cover-photo.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "JOIN IN",
    content:
      "A fun-filled afternoon of K-Pop karaoke and arcade action for the kids.",
    likes: 12,
  },
  {
    id: "e8",
    type: "event",
    title: "All Blacks vs England",
    subtitle: "Eden Park, Auckland",
    region: "Auckland",
    tags: ["Sport", "Rugby"],
    image:
      "https://media.rnztools.nz/rnz/image/upload/s--QSkDMRG---/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1720253537/4KNGB2C_240706_NZABvAustralia_007_JPG?auto=format&fit=crop&w=800&q=80",
    cta: "TICKETS",
    content:
      "The clash of the titans. Don't miss the action live at Eden Park.",
    likes: 4100,
  },
];

const RAW_WINS = [
  {
    id: "w1",
    type: "win",
    title: "Win a Trip to LA for two",
    subtitle: "Thanks to Air NZ",
    tags: ["WIN", "TRAVEL"],
    image:
      "https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-01/Getty_515070156_EDITORIALONLY_LosAngeles_HollywoodBlvd_Web72DPI_0.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "ENTER NOW",
    content:
      "We're sending you and a mate to the city of angels! Includes flights and 5 nights accommodation.",
    likes: 560,
  },
  {
    id: "w2",
    type: "win",
    title: "Score the Ultimate Gaming Setup",
    subtitle: "PB Tech",
    tags: ["WIN", "TECH"],
    image:
      "https://images.unsplash.com/photo-1598550476439-cce8bd2deb1d?auto=format&fit=crop&w=800&q=80",
    cta: "ENTER DRAW",
    content:
      "Level up with a top-tier PC, dual monitors, and all the peripherals you need.",
    likes: 890,
  },
  {
    id: "w3",
    type: "win",
    title: "Win Free Fuel for a Year",
    subtitle: "Z Energy",
    tags: ["WIN", "AUTO"],
    image:
      "https://media.rnztools.nz/rnz/image/upload/s--xEgoucya--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1644200576/4N1MNT0_copyright_image_217155?auto=format&fit=crop&w=800&q=80",
    cta: "FILL UP",
    content:
      "Forget about petrol prices. We've got your tank covered for the next 12 months.",
    likes: 2300,
  },
  {
    id: "w4",
    type: "win",
    title: "Win tickets to Coachella",
    subtitle: "The Edge",
    tags: ["WIN", "MUSIC"],
    image:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80",
    cta: "GET IN",
    content:
      "Pack your bags, we're sending you to the desert for the biggest festival on earth.",
    likes: 1540,
  },
];

const ADS = [
  {
    id: "ad-1",
    type: "ad",
    title: 'Be "that person" who brags about their bank app.',
    subtitle: "Sponsored",
    tags: ["SPONSORED"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cta: "LEARN MORE",
    brandColor: "bg-blue-900",
    format: "300x250",
  },
  {
    id: "ad-2",
    type: "ad",
    title: "Get 50% off your first meal box delivery.",
    subtitle: "Sponsored",
    tags: ["SPONSORED"],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    cta: "ORDER NOW",
    brandColor: "bg-green-700",
    format: "300x600",
  },
  {
    id: "ad-3",
    type: "ad",
    title: "Stream the latest blockbusters today.",
    subtitle: "Sponsored",
    tags: ["SPONSORED"],
    image:
      "https://www.whats-on-netflix.com/wp-content/uploads/2025/12/StrangerThings-S5-0495-R.jpg?auto=format&fit=crop&w=800&q=80",
    cta: "START TRIAL",
    brandColor: "bg-red-800",
    format: "300x250",
  },
];

const STATIONS = [
  {
    id: "edge",
    name: "The Edge",
    show: "Clint, Meg & Dan",
    img: "https://yt3.googleusercontent.com/w5c3hkhR47zD-Lpi1hxbiHqs6iwz-eHSr82qBVwV8LLjMdDv1nEvkIleHg_5aQcFZnkFssKcaQ=s160-c-k-c0x00ffffff-no-rj",
    color: "bg-pink-600",
    streamUrl: "https://mediaworks.streamguys1.com/edge_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "mai",
    name: "Mai FM",
    show: "Mai Morning Crew",
    img: "https://yt3.googleusercontent.com/GOhKWfF6q3kDdGIXjEQySsHcfszQrpyGE0s-e_9DmpkMaTackXNKhWB4-KNEZPKQoe6_QBcIrw=s900-c-k-c0x00ffffff-no-rj",
    color: "bg-yellow-500",
    streamUrl: "https://mediaworks.streamguys1.com/mai_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "rock",
    name: "The Rock",
    show: "The Morning Rumble",
    img: "https://yt3.googleusercontent.com/ytc/AIdro_mnoQI2A9zTrepmqC964GfcrzsGDyykJGB4v2-2SuDuOr4=s160-c-k-c0x00ffffff-no-rj",
    color: "bg-black",
    streamUrl: "https://mediaworks.streamguys1.com/rock_net/playlist.m3u8",
    videoStreamUrl:
      "https://d56ql9g5d3xr4.cloudfront.net/therock2kvod-2025/20250926T024531-final-input.m3u8",
  },
  {
    id: "george",
    name: "George FM",
    show: "General Lee",
    img: "https://yt3.googleusercontent.com/ytc/AIdro_mRclrF6YDoG4XE5R1i5WLWp0g0xknoMx6mCfdST_VViD0=s160-c-k-c0x00ffffff-no-rj",
    color: "bg-white",
    streamUrl: "https://mediaworks.streamguys1.com/george_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "more",
    name: "More FM",
    show: "Breakfast Club",
    img: "https://yt3.googleusercontent.com/FXIHPGBqGx-R0a5eMSpZExXa6H7kp3I9c6gMav5i_02U7-mBICmA7ktSzNhMkqt7oDSQqYOV0g=s160-c-k-c0x00ffffff-no-rj",
    color: "bg-blue-500",
    streamUrl: "https://mediaworks.streamguys1.com/more_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "sound",
    name: "The Sound",
    show: "The Morning Sound",
    img: "https://yt3.googleusercontent.com/a_kiqcV1y8gdlHvQjomwMvy6FDISkjQmYAtT9ItnQpkeCcpH7DPN3u4Mxz4QjiecAt2KNRtO1A=s160-c-k-c0x00ffffff-no-rj",
    color: "bg-blue-600",
    streamUrl: "https://mediaworks.streamguys1.com/sound_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "breeze",
    name: "The Breeze",
    show: "Robert & Jeanette",
    img: "https://images.mediaworks.nz/thebreeze_network/Content/shows/images/1761876181735_breeze-600.jpg",
    color: "bg-teal-400",
    streamUrl: "https://mediaworks.streamguys1.com/breeze_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "breezeclassic",
    name: "Breeze Classic",
    show: "Mark MacCarron",
    img: "https://images.mediaworks.nz/breezeclassic_network/Content/shows/images/1761862191626_brz-classic-600.png",
    color: "bg-purple-600",
    streamUrl:
      "https://mediaworks.streamguys1.com/breeze_classic_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "humm",
    name: "Humm FM",
    show: "Bollywood Hits",
    img: "https://stoppress.co.nz/wp-content/uploads/2021/12/MW-Humm-logo.png",
    color: "bg-red-800",
    streamUrl: "https://mediaworks.streamguys1.com/humm_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "channelx",
    name: "Channel X",
    show: "Alt Rock",
    img: "https://images.mediaworks.nz/channelx_network/Content/shows/images/1692669294981_channelx-600x600.png",
    color: "bg-green-800",
    streamUrl: "https://mediaworks.streamguys1.com/chx_net/playlist.m3u8",
    videoStreamUrl:
      "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
];

const PODCAST_CATEGORIES = [
  "All",
  "True Crime",
  "Comedy",
  "News",
  "Sports",
  "Business",
  "Health",
  "Society",
];

const MUSIC_GENRES = [
  "Rock",
  "Hip Hop",
  "Pop",
  "RnB",
  "Electronic",
  "Country",
  "Metal",
  "Indie",
  "Jazz",
  "Classical",
];

const EVENT_CATEGORIES = [
  "All",
  "Music",
  "Sport",
  "Comedy",
  "Arts",
  "Rock",
  "Pop",
  "Hip-Hop",
  "Electronic",
  "Family",
];
const EVENT_LOCATIONS = [
  "All of NZ",
  "Auckland",
  "Waikato",
  "Bay of Plenty",
  "Gisborne",
  "Wellington",
  "Canterbury",
  "Otago",
  "Southland",
];

const PLAYLISTS = [
  {
    title: "George Chillsville",
    subtitle: "Laid back beats for Sunday sessions",
    img: "https://images.mediaworks.nz/rova/Content/apps/images/chillsville_square_clint.png?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description:
      "The smoothest selection of electronic, downbeat and lo-fi house.",
    streamUrl:
      "https://playerservices.streamtheworld.com/api/livestream-redirect/CHILLSVILLE_S01.m3u8",
    tracks: [
      { title: "We Could Be Love", artist: "Odesza", time: "3:45" },
      { title: "Innerbloom", artist: "RÜFÜS DU SOL", time: "9:38" },
    ],
  },
  {
    title: "More FM High School Hits",
    subtitle: "The songs you grew up with",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description: "All the bangers from the school ball and the bus ride home.",
    tracks: [
      { title: "Wannabe", artist: "Spice Girls", time: "2:52" },
      { title: "Sk8er Boi", artist: "Avril Lavigne", time: "3:24" },
    ],
  },
  {
    title: "The Rock 2000 Replay",
    subtitle: "The countdown that stops the nation",
    img: "https://images.unsplash.com/photo-1542887800-faca0261c9e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    description: "Missed the countdown? Relive the top 100 tracks.",
    tracks: [
      { title: "Master of Puppets", artist: "Metallica", time: "8:35" },
      { title: "Everlong", artist: "Foo Fighters", time: "4:10" },
    ],
  },
];

const ALL_MUSIC_PLAYLISTS = [
  {
    title: "Olivia Dean",
    img: "https://images.unsplash.com/photo-1629813532392-cb3e8c049176?w=300&h=300&fit=crop",
  },
  {
    title: "The Notorious B.I.G",
    img: "https://images.unsplash.com/photo-1614745339243-7dc943e26487?w=300&h=300&fit=crop",
  },
  {
    title: "2Pac",
    img: "https://images.unsplash.com/photo-1557577239-2e99742576dd?w=300&h=300&fit=crop",
  },
  {
    title: "50 Cent",
    img: "https://images.unsplash.com/photo-1549488339-4d80a302e9d2?w=300&h=300&fit=crop",
  },
  {
    title: "Fred Again",
    img: "https://images.unsplash.com/photo-1563231362-e64fc41dc02f?w=300&h=300&fit=crop",
  },
  {
    title: "Ozzy Osbourne",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  },
  {
    title: "Kendrick Lamar",
    img: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=300&h=300&fit=crop",
  },
  {
    title: "Crew Cut",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop",
  },
  { title: "The Squawk", img: "image_37b8ff.jpg" },
  {
    title: "Weekly Weapon",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
  },
  { title: "Movie Moments", img: "Pop.jpg" },
  {
    title: "Totally 80s",
    img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=300&h=300&fit=crop",
  },
  { title: "Whitney Houston", img: "Pop.jpg" },
  { title: "Emo's Not Dead", img: "image_37b8ff.jpg" },
  {
    title: "George Chillsville",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "High School Hits",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  { title: "The Rock 2000", img: "image_37b8ff.jpg" },
];

const ROCK_PLAYLISTS = [
  { title: "The Squawk", img: "image_37b8ff.jpg" },
  { title: "Yungblud", img: "image_37b8ff.jpg" },
  { title: "Good Charlotte", img: "image_37b8ff.jpg" },
  { title: "The Rock 2000 Replay", img: "image_37b8ff.jpg" },
  { title: "Emo's Not Dead", img: "image_37b8ff.jpg" },
  { title: "Hall Of Fame", img: "image_37b8ff.jpg" },
  { title: "All Things M72", img: "image_37b8ff.jpg" },
  { title: "The Sound 60s", img: "image_37b8ff.jpg" },
  { title: "The Rock's Vanilla Rock", img: "image_37b8ff.jpg" },
  { title: "Nu Metal", img: "image_37b8ff.jpg" },
  { title: "Rockin' The Blues", img: "image_37b8ff.jpg" },
  { title: "Kiwi Rock", img: "image_37b8ff.jpg" },
  { title: "Pure Rock: Classics", img: "image_37b8ff.jpg" },
  { title: "Legends of Rock", img: "image_37b8ff.jpg" },
  { title: "The Rock 90s", img: "image_37b8ff.jpg" },
  { title: "Rock Workout", img: "image_37b8ff.jpg" },
];

const POP_PLAYLISTS = [
  { title: "Crew Cut", img: "Pop.jpg" },
  { title: "rova Review 2025", img: "Pop.jpg" },
  { title: "Lady Gaga", img: "Pop.jpg" },
  { title: "Hit The Spot", img: "Pop.jpg" },
  { title: "Demi Lovato", img: "Pop.jpg" },
  { title: "Michael Jackson", img: "Pop.jpg" },
  { title: "Sabrina Carpenter", img: "Pop.jpg" },
  { title: "Movie Moments", img: "Pop.jpg" },
  { title: "Ho Ho Hits", img: "Pop.jpg" },
  { title: "Classic Christmas", img: "Pop.jpg" },
  { title: "Playlist for Pets", img: "Pop.jpg" },
  { title: "Ariana Grande", img: "Pop.jpg" },
  { title: "Lorde", img: "Pop.jpg" },
  { title: "Breeze 400", img: "Pop.jpg" },
  { title: "Billie Eilish", img: "Pop.jpg" },
  { title: "More FM 90s", img: "Pop.jpg" },
  { title: "High School Hits", img: "Pop.jpg" },
  { title: "The Edge Rewind", img: "Pop.jpg" },
  { title: "Fresh Hits", img: "Pop.jpg" },
  { title: "The Edge Top 40", img: "Pop.jpg" },
  { title: "More Workout", img: "Pop.jpg" },
  { title: "Edge Workout", img: "Pop.jpg" },
  { title: "Justin Bieber", img: "Pop.jpg" },
  { title: "One Direction", img: "Pop.jpg" },
];

const HIPHOP_PLAYLISTS = [
  { title: "The Notorious B.I.G", img: "hiphop.jpg" },
  { title: "2Pac", img: "hiphop.jpg" },
  { title: "Crew Cut 2025", img: "hiphop.jpg" },
  { title: "rova Review", img: "hiphop.jpg" },
  { title: "Chris Brown", img: "hiphop.jpg" },
  { title: "R&V Mixtape", img: "hiphop.jpg" },
  { title: "Olivia Dean", img: "hiphop.jpg" },
  { title: "Kehlani", img: "hiphop.jpg" },
  { title: "Ho Ho Hits", img: "hiphop.jpg" },
  { title: "DJ Sir-Vere", img: "hiphop.jpg" },
  { title: "Mai Hot 1000", img: "hiphop.jpg" },
  { title: "Drake", img: "hiphop.jpg" },
  { title: "50 Cent", img: "hiphop.jpg" },
  { title: "Rihanna", img: "hiphop.jpg" },
  { title: "Neo Soul", img: "hiphop.jpg" },
  { title: "Major Flavours", img: "hiphop.jpg" },
  { title: "Soul Food", img: "hiphop.jpg" },
  { title: "Rap Gods", img: "hiphop.jpg" },
  { title: "Pure Hip Hop 90s", img: "hiphop.jpg" },
  { title: "Mai Workout", img: "hiphop.jpg" },
  { title: "Jordan Lee Mix", img: "hiphop.jpg" },
  { title: "Top 200 Since 2000", img: "hiphop.jpg" },
  { title: "Mellow Down", img: "hiphop.jpg" },
  { title: "Mai Heatseekers", img: "hiphop.jpg" },
];

const ALL_PODCASTS = [
  {
    id: "p1",
    title: "A Little Bit Extra",
    publisher: "rova | Sharyn Casey",
    category: "Society",
    img: "https://images.ctfassets.net/r65x6q43xsmv/1yuypk0eueL65xVhTM4zgO/cd336f06340445c1bd7f56fc688e5623/A-little-bit-Extra---Podcast-Creative-1080x1080.jpg",
    description:
      "A twice-weekly pop culture commentary podcast hosted by one of New Zealand's most trusted and entertaining voices, Sharyn Casey. Unpacking the stories everyone's whispering about.",
    episodes: [
      { title: "The Worst Celebrity I've Ever Interviewed", duration: "30m" },
      {
        title: "Joel Kim Booster On Loot, Love And Scrubs Revival",
        duration: "28m",
      },
    ],
  },
  {
    id: "p2",
    title: "Not For Radio",
    publisher: "rova | Jay & Dunc",
    category: "Comedy",
    img: "https://i.scdn.co/image/ab67656300005f1fb589578aea2868bbd0567ae2",
    description:
      "These are the stories and yarns from Jay & Dunc (and you!) in all their unfiltered and uncensored glory. It's NOT FOR RADIO!",
    episodes: [
      { title: "Resuscitation from a naked butler", duration: "42m" },
      { title: "Burn survivor, Samoana Matangi", duration: "59m" },
    ],
  },
  {
    id: "p3",
    title: "The Morning Rumble",
    publisher: "The Rock",
    category: "Comedy",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/91/c1/9b/91c19b18-7311-a7c0-79c6-ca2a53751ef1/mza_13926270606480207213.jpg/1200x1200bf-60.jpg",
    description:
      "If you like hard hitting news and informative talk...then listen to something else. But if you're after plenty of laughs, in-fighting and a whole lot of piss-taking, you're in the right place.",
    episodes: [
      { title: "ON-AIR 🟢 - Free Fuel, Feedback-ception", duration: "53m" },
      { title: "BEST BITS OF THE WEEK 🔥- 12/12", duration: "5m" },
    ],
  },
  {
    id: "p4",
    title: "Crime Junkie",
    publisher: "audiochuck",
    category: "True Crime",
    img: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=300&q=80",
    description: "You know you're obsessed. We are too.",
    episodes: [
      { title: "MURDERED: The Doe Family", duration: "48m" },
      { title: "MISSING: Sarah Joe", duration: "38m" },
    ],
  },
  {
    id: "p5",
    title: "New Heights",
    publisher: "Wave Sports",
    category: "Sports",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=300&q=80",
    description: "Football's funniest family duo.",
    episodes: [
      { title: "Super Bowl Recap", duration: "1h 10m" },
      { title: "Draft Predictions", duration: "58m" },
    ],
  },
  {
    id: "p6",
    title: "The Daily",
    publisher: "The New York Times",
    category: "News",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80",
    description: "This is how the news should sound.",
    episodes: [
      { title: "The State of the Economy", duration: "24m" },
      { title: "Global Politics Update", duration: "21m" },
    ],
  },
];

const SHOP_ITEMS = [
  {
    id: 1,
    title: "Rock x Levi's Trucker Jacket",
    price: "$195.00",
    img: "https://images.unsplash.com/photo-1523359346063-d879354e6366?w=300&h=300&fit=crop",
    status: "",
  },
  {
    id: 2,
    title: "The Rock 2000 Event Hoodie",
    price: "$76.50",
    oldPrice: "$102.00",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
    status: "SALE",
  },
  {
    id: 3,
    title: "Bryce Cubes",
    price: "$20.00",
    img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop",
    status: "SOLD OUT",
  },
  {
    id: 4,
    title: "The Rock 2000 Event T-Shirt",
    price: "$30.00",
    oldPrice: "$40.00",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    status: "SALE",
  },
  {
    id: 5,
    title: "Rock Logo Singlet",
    price: "$39.00",
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
    status: "",
  },
  {
    id: 6,
    title: "Rock Dad Cap",
    price: "$32.00",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
    status: "SOLD OUT",
  },
  {
    id: 7,
    title: "Rock Baby Onesies",
    price: "$25.00",
    img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&h=300&fit=crop",
    status: "SOLD OUT",
  },
  {
    id: 8,
    title: "Rock BBQ Apron",
    price: "$32.00",
    img: "https://images.unsplash.com/photo-1583944464001-f80e02d3ca51?w=300&h=300&fit=crop",
    status: "SOLD OUT",
  },
  {
    id: 9,
    title: "Rova Tote Bag",
    price: "$15.00",
    img: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=300&h=300&fit=crop",
    status: "NEW",
  },
  {
    id: 10,
    title: "Mai FM Bucket Hat",
    price: "$35.00",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=300&h=300&fit=crop",
    status: "",
  },
];

const MOCK_CHAT = [
  { id: 1, user: "Sarah J", text: "Love this song! 🔥", isBrand: false },
  {
    id: 2,
    user: "Mikey88",
    text: "When are you guys announcing the winner?",
    isBrand: false,
  },
  {
    id: 3,
    user: "The Edge",
    text: "Hey Mikey! Winner announced at 8am tomorrow!",
    isBrand: true,
  },
  {
    id: 4,
    user: "Jess_xo",
    text: "Omg Clint is hilarious today 😂",
    isBrand: false,
  },
];

const MOCK_PLAYED_SONGS = [
  {
    id: 1,
    title: "Everlong",
    artist: "Foo Fighters",
    time: "9:41 AM",
    img: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Killing In The Name",
    artist: "Rage Against The Machine",
    time: "9:35 AM",
    img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Numb",
    artist: "Linkin Park",
    time: "9:31 AM",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "Black Hole Sun",
    artist: "Soundgarden",
    time: "9:26 AM",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    time: "9:21 AM",
    img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    title: "Chop Suey!",
    artist: "System of a Down",
    time: "9:17 AM",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
  },
];

const MOCK_COMMENTS_DATA = [
  { user: "jess_xo", text: "This is absolutely iconic! 😍" },
  { user: "mike_t", text: "Wait, is this for real?" },
  { user: "sarah_nz", text: "Can't believe I missed this!" },
  { user: "tommy_g", text: "Legendary behavior." },
  { user: "kiwi_fan", text: "More of this please!!" },
];

const formatLikeCount = (count) => {
  if (!count) return "";
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return count.toString();
};

const LATEST_CONTENT_STORIES = RAW_ARTICLES;
const EVENTS_STORIES = RAW_EVENTS;

// --- HELPER COMPONENTS ---

const StationAvatar = ({ station, size = "w-20 h-20" }) => {
  const [error, setError] = useState(false);

  if (error || !station.img) {
    return (
      <div
        className={`${size} rounded-full ${station.color} flex items-center justify-center border-2 border-transparent group-hover:border-[#7F5AF0] transition-all shadow-lg`}
      >
        <span className="text-white font-black text-xs text-center leading-tight px-1 uppercase break-words">
          {station.name.replace("FM", "").trim()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${size} rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#7F5AF0] group-hover:scale-105 transition-all bg-white relative shadow-lg`}
    >
      <img
        src={station.img}
        alt={station.name}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

const CategoryButton = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-[#1E1E1E] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#252525] transition-colors group ${className}`}
  >
    <div className="text-[#7F5AF0] group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <span className="text-white font-bold text-sm tracking-wide">{label}</span>
  </button>
);

const StoryGrid = ({ items }) => {
  if (!items) return null;
  return (
    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto pb-20">
      {items.map((item) => (
        <div
          key={item.id || Math.random()}
          className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
        >
          <img
            src={item.img || item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-bold text-sm leading-tight line-clamp-3 drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShopGrid = ({ items }) => {
  if (!items) return null;
  return (
    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto pb-20">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer flex flex-col"
        >
          <div className="relative aspect-square">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_FALLBACK_IMAGE;
              }}
            />
            {item.status && (
              <div
                className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-bold rounded uppercase text-white ${
                  item.status === "SOLD OUT" ? "bg-black" : "bg-red-600"
                }`}
              >
                {item.status}
              </div>
            )}
          </div>
          <div className="p-3 flex-1 flex flex-col justify-between">
            <h3 className="text-black font-bold text-xs leading-tight line-clamp-2 mb-2">
              {item.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-[#7F5AF0] font-black text-sm">
                {item.price}
              </span>
              {item.oldPrice && (
                <span className="text-gray-400 text-xs line-through decoration-red-500 decoration-2">
                  {item.oldPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- VIEWS & MODALS ---

const NavigationBar = ({ activeTab, onTabChange }) => (
  <div className="absolute bottom-0 w-full h-[85px] bg-black/95 backdrop-blur-md border-t border-white/10 flex justify-around pt-4 z-50">
    {["stream", "explore", "search"].map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className="group flex flex-col items-center gap-1 w-16"
      >
        {tab === "stream" && (
          <Radio
            className={`w-6 h-6 transition-colors ${
              activeTab === tab ? "text-[#7F5AF0]" : "text-gray-500"
            }`}
          />
        )}
        {tab === "explore" && (
          <div
            className={`p-1 rounded-lg transition-all ${
              activeTab === tab ? "bg-[#7F5AF0]/20" : ""
            }`}
          >
            <Zap
              className={`w-6 h-6 transition-colors ${
                activeTab === tab
                  ? "text-[#7F5AF0] fill-current"
                  : "text-gray-500"
              }`}
            />
          </div>
        )}
        {tab === "search" && (
          <Search
            className={`w-6 h-6 transition-colors ${
              activeTab === tab ? "text-[#7F5AF0]" : "text-gray-500"
            }`}
          />
        )}
        <span
          className={`text-[10px] font-medium capitalize ${
            activeTab === tab ? "text-white" : "text-gray-500"
          }`}
        >
          {tab}
        </span>
      </button>
    ))}
  </div>
);

// Updated VideoFeedItem with IntersectionObserver for Autoplay and Fallback Image
const VideoFeedItem = ({
  item,
  onItemClick,
  onHide,
  isLiked,
  onLike,
  onComment,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Sync video playback with isPlaying state & Handle Overlay Fade
  useEffect(() => {
    const video = videoRef.current;

    // Handle Video Playback
    if (video) {
      if (isPlaying) {
        video.play().catch((e) => console.log("Playback prevented", e));
      } else {
        video.pause();
      }
    }

    // Handle Overlay Visibility
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowOverlay(true);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // If we are pausing, or starting to play, ensure overlay is visible initially
    if (!isPlaying) setShowOverlay(true);
  };

  const getThumbnail = (url) => {
    if (imgError) return DEFAULT_FALLBACK_IMAGE;
    try {
      let id = "";
      if (url.includes("/shorts/")) {
        id = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("/embed/")) {
        id = url.split("/embed/")[1].split("?")[0];
      }
      return id
        ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        : DEFAULT_FALLBACK_IMAGE;
    } catch (e) {
      return DEFAULT_FALLBACK_IMAGE;
    }
  };

  const likesCount = (item.likes || 0) + (isLiked ? 1 : 0);
  const isIframe =
    item.videoUrl.includes("youtube") ||
    item.videoUrl.includes("player") ||
    item.videoUrl.includes("embed");

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      className="w-full h-full snap-center snap-always relative flex-shrink-0 bg-gray-900 overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-black">
        {isIframe ? (
          !isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={getThumbnail(item.videoUrl)}
                className="w-full h-full object-cover opacity-60"
                alt="Video Thumbnail"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-[120%] -mt-[10%] object-cover pointer-events-none"
              src={item.videoUrl}
              title="video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          /* HTML5 Video - Persistent */
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={item.videoUrl}
              loop
              playsInline
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Gradient Overlay - Fades out */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/95 pointer-events-none transition-opacity duration-500 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content Info - Fades out */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 pb-28 pointer-events-none transition-opacity duration-500 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`pointer-events-auto ${
            showOverlay ? "" : "pointer-events-none"
          }`}
        >
          <div className="flex gap-2 mb-3">
            {item.tags &&
              item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#7F5AF0] text-white px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider shadow-sm"
                >
                  {tag}
                </span>
              ))}
          </div>
          <h2 className="text-3xl font-black text-white leading-none mb-2 drop-shadow-md">
            {item.title}
          </h2>
          <p className="text-gray-300 text-sm font-medium mb-6 drop-shadow-md">
            {item.subtitle}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(item);
            }}
            className="w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-transform active:scale-95 shadow-lg bg-[#7F5AF0] text-white"
          >
            {item.cta}
          </button>
        </div>
      </div>

      {/* Side Actions - Always Visible */}
      <div className="absolute right-2 bottom-32 flex flex-col items-center gap-6 pointer-events-auto">
        {/* Heart */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center transition-transform active:scale-90"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
          {likesCount > 0 && (
            <span className="text-xs font-bold text-white shadow-black drop-shadow-md">
              {formatLikeCount(likesCount)}
            </span>
          )}
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment();
            }}
            className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-transform active:scale-90"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold text-white shadow-black drop-shadow-md">
            {MOCK_COMMENTS_DATA.length}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExploreFeed = ({
  feedData,
  onItemClick,
  likedItems,
  onToggleLike,
  onOpenComments,
}) => {
  const [hiddenItems, setHiddenItems] = useState(new Set());

  const handleHide = (key) => {
    setHiddenItems((prev) => new Set(prev).add(key));
  };

  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-black">
      {feedData.map((item, index) => {
        const uniqueKey = `${item.id}-${index}`;
        if (hiddenItems.has(uniqueKey)) return null;

        // Specific Ad Rendering
        if (item.type === "ad") {
          // Determine format - default to 300x250 if not specified
          const isTall = item.format === "300x600";
          const dimensions = isTall
            ? "w-[300px] h-[600px]"
            : "w-[300px] h-[250px]";

          return (
            <div
              key={uniqueKey}
              className="w-full h-full snap-center snap-always relative flex-shrink-0 bg-gray-200 flex flex-col items-center justify-center p-4"
            >
              {/* Ad Unit Container */}
              <div
                className={`${dimensions} bg-white shadow-md border border-gray-300 flex flex-col relative overflow-hidden`}
              >
                {/* Ad Header/Badge */}
                <div className="absolute top-0 right-0 bg-white/95 px-1.5 py-0.5 text-[10px] text-gray-400 border-l border-b border-gray-200 z-10 font-sans">
                  Ads by Google
                </div>
                <div className="absolute top-0 left-0 bg-white/95 px-1.5 py-0.5 text-[10px] text-gray-400 border-r border-b border-gray-200 z-10 font-sans flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Sponsored
                </div>

                {/* Main Ad Image */}
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt="Ad Content"
                  onError={() => handleHide(uniqueKey)}
                />

                {/* Simple overlay for text if image doesn't have it baked in (simulating text ads or native display) */}
                <div className="absolute bottom-0 inset-x-0 bg-white/95 p-3 border-t border-gray-100 flex flex-col gap-2">
                  <h3 className="text-black font-bold text-sm leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => onItemClick(item)}
                    className={`w-full py-2 ${
                      item.brandColor || "bg-blue-600"
                    } text-white text-xs font-bold rounded shadow-sm uppercase tracking-wide`}
                  >
                    {item.cta}
                  </button>
                </div>
              </div>

              {/* Disclaimer / Hint below ad to show it's separate from feed flow */}
              <div className="absolute bottom-24 text-gray-400 text-[10px] animate-pulse">
                Advertisement • Scroll to continue
              </div>
            </div>
          );
        }

        // Standard Content Rendering
        const isLiked = !!likedItems[uniqueKey];
        const likesCount = (item.likes || 0) + (isLiked ? 1 : 0);

        if (item.type === "video") {
          return (
            <VideoFeedItem
              key={uniqueKey}
              item={item}
              onItemClick={onItemClick}
              onHide={() => handleHide(uniqueKey)}
              isLiked={isLiked}
              onLike={() => onToggleLike(uniqueKey)}
              onComment={() => onOpenComments(item)}
            />
          );
        }

        return (
          <div
            key={uniqueKey}
            className="w-full h-full snap-center snap-always relative flex-shrink-0 bg-gray-900 overflow-hidden"
          >
            <img
              src={item.image}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt={item.title}
              onError={() => handleHide(uniqueKey)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/95 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 pb-28 pointer-events-none">
              <div className="pointer-events-auto">
                <div className="flex gap-2 mb-3">
                  {item.tags &&
                    item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-[#7F5AF0] text-white px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <h2 className="text-3xl font-black text-white leading-none mb-2 drop-shadow-md">
                  {item.title}
                </h2>
                {item.subtitle && (
                  <p className="text-gray-300 text-sm font-medium mb-6 drop-shadow-md">
                    {item.subtitle}
                  </p>
                )}
                <button
                  onClick={() => onItemClick(item)}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-transform active:scale-95 shadow-lg bg-[#7F5AF0] text-white"
                >
                  {item.cta}
                </button>
              </div>
            </div>
            <div className="absolute right-2 bottom-32 flex flex-col items-center gap-6 pointer-events-auto">
              {/* Heart */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => onToggleLike(uniqueKey)}
                  className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center transition-transform active:scale-90"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </button>
                {likesCount > 0 && (
                  <span className="text-xs font-bold text-white shadow-black drop-shadow-md">
                    {formatLikeCount(likesCount)}
                  </span>
                )}
              </div>

              {/* Comment */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => onOpenComments(item)}
                  className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-transform active:scale-90"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">
                  {MOCK_COMMENTS_DATA.length}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommentsModal = ({ item, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose}></div>

      {/* Sheet */}
      <div
        className={`bg-[#1E1E1E] rounded-t-3xl h-[60%] flex flex-col transition-transform duration-300 ${
          isClosing ? "translate-y-full" : "translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
        </div>

        <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-white font-bold">
            Comments ({MOCK_COMMENTS_DATA.length})
          </h3>
          <button onClick={handleClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_COMMENTS_DATA.map((comment, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0"></div>
              <div>
                <p className="text-gray-400 text-xs font-bold mb-0.5">
                  {comment.user}
                </p>
                <p className="text-white text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-[#2A2A2A] rounded-full px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="bg-transparent flex-1 text-white text-sm focus:outline-none"
            />
            <button className="text-[#7F5AF0] font-bold text-sm">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FullScreenPlayerModal = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[90] flex flex-col bg-gradient-to-b from-gray-900 to-black transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 mt-8">
        <button onClick={handleClose}>
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
        <span className="text-white font-bold text-xs tracking-widest uppercase">
          Live Radio
        </span>
        <button>
          <MoreHorizontal className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Artwork */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
          <Music className="w-32 h-32 text-black/20" />
          <div className="absolute inset-0 border-4 border-white/10 rounded-2xl"></div>
        </div>
      </div>

      {/* Info & Controls */}
      <div className="px-8 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white font-black text-2xl mb-1">
              The Rock Drive
            </h2>
            <p className="text-gray-400 text-lg">Jay & Dunc - Live Now</p>
          </div>
          <button>
            <Heart className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress Bar (Fake for Live) */}
        <div className="w-full h-1 bg-gray-800 rounded-full mb-2">
          <div className="w-full h-full bg-[#7F5AF0] rounded-full"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-bold mb-8">
          <span>LIVE</span>
          <span>-0:00</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Shuffle className="w-6 h-6 text-gray-600" />
          <div className="flex items-center gap-6">
            <button>
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-black fill-current" />
              ) : (
                <Play className="w-8 h-8 text-black fill-current ml-1" />
              )}
            </button>
            <button>
              <ChevronLeft className="w-8 h-8 text-white rotate-180" />
            </button>
          </div>
          <Cast className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const PodcastPlayerModal = ({ episode, podcast, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[80] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex justify-between items-center text-white">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-bold tracking-widest text-gray-400">
          NOW PLAYING
        </span>
        <button>
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-64 h-64 rounded-xl shadow-2xl mb-8 relative">
          <img
            src={podcast.img}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {episode.title}
        </h2>
        <p className="text-[#7F5AF0] font-medium mb-8">{podcast.title}</p>

        <div className="w-full h-1 bg-gray-800 rounded-full mb-2">
          <div className="w-1/3 h-full bg-[#7F5AF0] rounded-full"></div>
        </div>
        <div className="w-full flex justify-between text-xs text-gray-500 mb-10">
          <span>12:45</span>
          <span>{episode.duration}</span>
        </div>

        <div className="flex items-center gap-8">
          <Shuffle className="w-6 h-6 text-gray-500" />
          <div className="w-12 h-12 flex items-center justify-center">
            <ChevronLeft className="w-8 h-8 text-white" />
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-[#7F5AF0] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-current" />
            ) : (
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            )}
          </button>
          <div className="w-12 h-12 flex items-center justify-center rotate-180">
            <ChevronLeft className="w-8 h-8 text-white" />
          </div>
          <Download className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

const PodcastDetailModal = ({ podcast, onClose, onEpisodeClick }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[70] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex justify-between items-center text-white sticky top-0 bg-[#121212] z-10">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button>
          <Share2 className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <div className="flex gap-4 mb-6">
          <img
            src={podcast.img}
            className="w-32 h-32 rounded-lg object-cover shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
          <div className="flex flex-col justify-end">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
              {podcast.title}
            </h1>
            <p className="text-[#7F5AF0] font-medium text-sm mb-3">
              {podcast.publisher}
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm self-start flex items-center gap-1">
              <Plus className="w-4 h-4" /> Follow
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {podcast.description}
        </p>

        <h3 className="text-white font-bold mb-4">Episodes</h3>
        <div className="space-y-4">
          {podcast.episodes.map((ep, i) => (
            <div
              key={i}
              onClick={() => onEpisodeClick(ep)}
              className="bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-bold text-sm line-clamp-1">
                  {ep.title}
                </h4>
                <span className="text-xs text-gray-500">{ep.duration}</span>
              </div>
              <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                Episode description goes here.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Play className="w-3 h-3 text-black fill-current ml-0.5" />
                </div>
                <span className="text-[#7F5AF0] text-xs font-bold">
                  Play Episode
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AllPodcastsView = ({ onClose, onPodcastClick, onEpisodeClick }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const filteredPodcasts =
    selectedCat === "All"
      ? ALL_PODCASTS
      : ALL_PODCASTS.filter((p) => p.category === selectedCat);

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Podcasts</h1>
      </div>

      <div className="flex-1 relative bg-[#121212]">
        <iframe
          src="https://rova-podcast-951610193104.us-west1.run.app/"
          className="w-full h-full border-0"
          title="Rova Podcasts"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const AllStationsView = ({ onClose, onStationClick }) => {
  const [search, setSearch] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const filteredStations = STATIONS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-3 border-b border-white/10 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent text-white text-sm focus:outline-none w-full"
            placeholder="Search stations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              onClick={() => onStationClick(station)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <StationAvatar station={station} size="w-24 h-24" />
              <span className="text-white text-xs font-bold text-center">
                {station.name}
              </span>
            </div>
          ))}
        </div>
        {filteredStations.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No stations found.
          </div>
        )}
      </div>
    </div>
  );
};

const AllMusicPlaylistsView = ({ onClose, onPlaylistClick }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Rock");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  // Logic to determine which playlist array to show
  let displayedPlaylists = ALL_MUSIC_PLAYLISTS;
  if (selectedGenre === "Rock") displayedPlaylists = ROCK_PLAYLISTS;
  else if (selectedGenre === "Pop") displayedPlaylists = POP_PLAYLISTS;
  else if (selectedGenre === "Hip Hop") displayedPlaylists = HIPHOP_PLAYLISTS;

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Music Playlists</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Genre Pills */}
        <div className="px-4 py-4 sticky top-0 bg-[#121212] z-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {MUSIC_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="px-4 pb-8">
          <div className="grid grid-cols-3 gap-4">
            {displayedPlaylists.map((playlist, i) => (
              <div
                key={i}
                onClick={() => onPlaylistClick(playlist)}
                className="flex flex-col gap-2 cursor-pointer group"
              >
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
                  <img
                    src={playlist.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={playlist.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#7F5AF0] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                  </div>
                </div>
                <span className="text-white text-xs font-bold leading-tight">
                  {playlist.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AllVideosView = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  // Helper to extract YouTube ID for thumbnail
  const getThumbnail = (url) => {
    try {
      let id = "";
      if (url.includes("/shorts/")) {
        id = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("/embed/")) {
        id = url.split("/embed/")[1].split("?")[0];
      }
      return id
        ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
        : DEFAULT_FALLBACK_IMAGE;
    } catch (e) {
      return DEFAULT_FALLBACK_IMAGE;
    }
  };

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Videos</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {RAW_VIDEOS.map((video, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 cursor-pointer group bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={getThumbnail(video.videoUrl)}
                  className="w-full h-full object-cover"
                  alt={video.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                  <p className="text-white text-xs font-bold leading-snug line-clamp-3">
                    {video.content}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AllNewsView = ({ onClose, onArticleClick }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  // Filter content
  const filteredContent = RAW_ARTICLES.filter(
    (item) =>
      selectedCat === "All" ||
      (item.tags &&
        item.tags.some(
          (tag) => tag.includes(selectedCat) || selectedCat.includes(tag)
        ))
  );

  // Split content for layout
  // 1. Featured (Top 3)
  const featuredStories = filteredContent.slice(0, 3);
  // 2. Trending Grid (Next 6)
  const trendingStories = filteredContent.slice(3, 9);
  // 3. The Rest (List)
  const listStories = filteredContent.slice(9);

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212] sticky top-0 z-20">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">News</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Featured Carousel */}
        {featuredStories.length > 0 && (
          <div className="p-4 pb-0 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {featuredStories.map((story, i) => (
              <div
                key={i}
                onClick={() => onArticleClick(story)}
                className="flex-shrink-0 w-[85%] snap-center relative aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={story.image}
                  className="w-full h-full object-cover"
                  alt={story.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[#7F5AF0] text-[10px] font-bold uppercase mb-1">
                    {story.tags[0]}
                  </span>
                  <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
                    {story.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Pills */}
        <div className="sticky top-0 bg-[#121212] z-10 py-4 border-b border-white/5">
          <div className="px-4 flex gap-2 overflow-x-auto no-scrollbar">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Grid */}
        {trendingStories.length > 0 && (
          <div className="p-4">
            <h2 className="text-white font-bold text-lg mb-3">Trending</h2>
            <div className="grid grid-cols-2 gap-3">
              {trendingStories.map((story, i) => (
                <div
                  key={i}
                  onClick={() => onArticleClick(story)}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={story.image}
                    className="w-full h-full object-cover"
                    alt={story.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3">
                    <h3 className="text-white font-bold text-xs leading-snug line-clamp-3">
                      {story.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest List */}
        {listStories.length > 0 && (
          <div className="px-4 pb-4">
            <h2 className="text-white font-bold text-lg mb-3">Latest</h2>
            <div className="space-y-4">
              {listStories.map((story, i) => (
                <div
                  key={i}
                  onClick={() => onArticleClick(story)}
                  className="flex gap-4 cursor-pointer"
                >
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={story.image}
                      className="w-full h-full object-cover"
                      alt={story.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex gap-2 mb-1">
                      <span className="text-[#7F5AF0] text-[10px] font-bold uppercase">
                        {story.tags[0]}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-1">
                      {story.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{story.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredContent.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No stories found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

const AllEventsView = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedLocations, setSelectedLocations] = useState(["All of NZ"]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLocation = (loc) => {
    if (loc === "All of NZ") {
      setSelectedLocations(["All of NZ"]);
    } else {
      let newLocs = [...selectedLocations];
      // Remove "All of NZ" if selecting a specific region
      if (newLocs.includes("All of NZ")) newLocs = [];

      if (newLocs.includes(loc)) {
        newLocs = newLocs.filter((l) => l !== loc);
      } else {
        newLocs.push(loc);
      }

      // If nothing selected, revert to All
      if (newLocs.length === 0) newLocs = ["All of NZ"];

      setSelectedLocations(newLocs);
    }
  };

  const filteredEvents = RAW_EVENTS.filter((event) => {
    const matchesCat =
      selectedCat === "All" || event.tags.includes(selectedCat);
    const matchesLoc =
      selectedLocations.includes("All of NZ") ||
      selectedLocations.includes(event.region);
    return matchesCat && matchesLoc;
  });

  const featuredEvent = filteredEvents.length > 0 ? filteredEvents[0] : null;
  const gridEvents = filteredEvents.length > 0 ? filteredEvents.slice(1) : [];

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212] sticky top-0 z-20">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Events</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Filters */}
        <div className="sticky top-0 bg-[#121212] z-10 pb-4 pt-2">
          <div className="px-4 flex gap-2 overflow-x-auto no-scrollbar items-center">
            {/* Location Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${
                  showLocationDropdown
                    ? "bg-[#7F5AF0] text-white border-[#7F5AF0]"
                    : "bg-[#252525] text-white border-white/10"
                }`}
              >
                <MapPin className="w-3 h-3" />
                {selectedLocations.length === 1
                  ? selectedLocations[0]
                  : `${selectedLocations.length} Regions`}
                {showLocationDropdown ? (
                  <ChevronUp className="w-3 h-3 ml-1" />
                ) : (
                  <ChevronDown className="w-3 h-3 ml-1" />
                )}
              </button>

              {/* Dropdown Menu */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1E1E1E] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="max-h-60 overflow-y-auto">
                    {EVENT_LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => toggleLocation(loc)}
                        className="w-full text-left px-4 py-3 text-xs font-bold text-gray-300 hover:bg-white/5 flex items-center justify-between"
                      >
                        {loc}
                        {selectedLocations.includes(loc) && (
                          <Check className="w-3 h-3 text-[#7F5AF0]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[1px] h-6 bg-white/10 mx-1 shrink-0"></div>

            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featuredEvent && (
          <div className="p-4 pt-0">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img
                src={featuredEvent.image}
                className="w-full h-full object-cover"
                alt={featuredEvent.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_FALLBACK_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[#7F5AF0] text-[10px] font-bold uppercase mb-1">
                  {featuredEvent.tags[0]} • FEATURED
                </span>
                <h2 className="text-white font-black text-xl leading-tight mb-1">
                  {featuredEvent.title}
                </h2>
                <p className="text-gray-300 text-xs line-clamp-2">
                  {featuredEvent.content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="px-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            {gridEvents.map((event, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-900 group"
              >
                <img
                  src={event.image}
                  className="w-full h-full object-cover"
                  alt={event.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3">
                  <span className="text-[#7F5AF0] text-[9px] font-bold uppercase mb-0.5">
                    {event.tags[0]}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-[10px] mt-1">
                    {event.subtitle}
                  </p>
                </div>
              </div>
            ))}
            {gridEvents.length === 0 && !featuredEvent && (
              <div className="col-span-2 text-center text-gray-500 py-10 text-sm">
                No events found for this selection.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AllWinView = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Win</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <StoryGrid items={RAW_WINS.map((w) => ({ ...w, img: w.image }))} />
      </div>
    </div>
  );
};

const AllShopView = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="p-4 flex items-center gap-4 text-white border-b border-white/5 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Shop</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <ShopGrid items={SHOP_ITEMS} />
      </div>
    </div>
  );
};

const AccountSettingsView = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[95] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-x-full" : "translate-x-0"
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-4 border-b border-white/10 bg-[#121212]">
        <button onClick={handleClose}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">Account Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-20">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#252525] flex items-center justify-center mb-4 relative overflow-hidden">
            <User className="w-10 h-10 text-gray-500" />
            {/* Simulated uploaded image */}
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
              className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
              alt="User Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_FALLBACK_IMAGE;
              }}
            />
          </div>
          <h2 className="text-xl font-bold text-white">Michael Baker</h2>
          <p className="text-sm text-gray-400">Rova Member</p>
        </div>

        {/* Contact Details */}
        <div className="bg-[#1E1E1E] rounded-xl p-4 mb-6 space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Contact Details
          </h3>
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-[#7F5AF0]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">+64 21 123 4567</p>
              <p className="text-gray-500 text-xs">Mobile</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
          <div className="w-full h-[1px] bg-white/5"></div>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-[#7F5AF0]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                michael.baker@example.com
              </p>
              <p className="text-gray-500 text-xs">Email</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
          <div className="w-full h-[1px] bg-white/5"></div>
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-[#7F5AF0]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Auckland, NZ</p>
              <p className="text-gray-500 text-xs">Location</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Settings Options */}
        <div className="bg-[#1E1E1E] rounded-xl p-4 mb-6 space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Preferences
          </h3>
          <button className="w-full flex items-center gap-4">
            <Heart className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left text-white text-sm font-medium">
              My Favourites
            </span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="w-full h-[1px] bg-white/5"></div>
          <button className="w-full flex items-center gap-4">
            <Bookmark className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left text-white text-sm font-medium">
              Saved
            </span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="w-full h-[1px] bg-white/5"></div>
          <button className="w-full flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left text-white text-sm font-medium">
              Notifications
            </span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="w-full h-[1px] bg-white/5"></div>
          <button className="w-full flex items-center gap-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left text-white text-sm font-medium">
              Email Settings
            </span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button className="w-full py-4 text-red-500 font-bold text-sm flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
};

const MiniPlayer = ({ visible, onClick, currentTrack }) => {
  if (!visible) return null;

  // Default fallback if nothing has been played yet
  const track = currentTrack || {
    title: "The Rock Drive",
    subtitle: "Jay & Dunc - Live Now",
    img: "https://yt3.googleusercontent.com/ytc/AIdro_mnoQI2A9zTrepmqC964GfcrzsGDyykJGB4v2-2SuDuOr4=s160-c-k-c0x00ffffff-no-rj",
    isPlaying: false,
  };

  return (
    <div
      onClick={onClick}
      className="absolute bottom-[86px] left-0 right-0 bg-[#1E1E1E] h-14 flex items-center px-4 border-t border-white/5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 z-40 cursor-pointer"
    >
      <div className="w-9 h-9 rounded mr-3 flex items-center justify-center shrink-0 overflow-hidden relative bg-gray-800">
        {track.img ? (
          <img
            src={track.img}
            alt="Now Playing"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center ${
            track.img ? "hidden" : ""
          }`}
        >
          <Music className="w-4 h-4 text-black" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm truncate">{track.title}</p>
        <p className="text-gray-400 text-xs truncate">{track.subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <Cast className="w-5 h-5 text-gray-400" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            // In a full app, this would toggle the global play state
          }}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center pl-0.5"
        >
          {track.isPlaying ? (
            <Pause className="w-4 h-4 text-black fill-current" />
          ) : (
            <Play className="w-4 h-4 text-black fill-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

const StreamDashboard = ({
  onPlaylistClick,
  onStationClick,
  onViewAllRadio,
  onViewAllPodcasts,
  onPodcastClick,
  onViewAllPlaylists,
  favorites,
  onToggleFavorite,
  onNavigateToSearch,
  recentlyPlayed,
}) => {
  return (
    <div className="h-full overflow-y-auto pb-32 pt-12 px-5 bg-[#121212] text-white no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Stream</h1>
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <Cast className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* --- MY FAVOURITES RAIL --- */}
      {favorites.length > 0 && (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold">My Favourites</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 items-start">
            {favorites.map((fav, i) => (
              <div
                key={`${fav.type}-${fav.id || fav.title}-${i}`}
                onClick={() => {
                  if (fav.type === "station") onStationClick(fav);
                  if (fav.type === "podcast") onPodcastClick(fav);
                  if (fav.type === "playlist") onPlaylistClick(fav);
                }}
                className="flex-shrink-0 w-24 flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden relative shadow-lg bg-gray-800 border-2 border-white/10">
                  <img
                    src={fav.img || fav.image}
                    alt={fav.title || fav.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium text-center line-clamp-2 leading-tight">
                  {fav.title || fav.name}
                </span>
              </div>
            ))}

            {/* Add More Card */}
            <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2 group cursor-pointer">
              <button
                onClick={onNavigateToSearch}
                className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 transition-colors"
              >
                <Plus className="w-8 h-8 text-gray-500 group-hover:text-white" />
              </button>
              <span className="text-xs text-gray-500 font-medium">Add</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Live Radio</h2>
          <button
            onClick={onViewAllRadio}
            className="text-xs text-[#7F5AF0] font-bold"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {STATIONS.slice(0, 5).map((station, i) => {
            const isFav = favorites.some(
              (f) => f.type === "station" && f.id === station.id
            );
            return (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer relative"
                onClick={() => onStationClick(station)}
              >
                <div className="relative">
                  <StationAvatar station={station} />
                  {i < 3 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#7F5AF0] h-4 flex items-center justify-center rounded-b-full">
                      <span className="text-[8px] font-bold uppercase text-white leading-none">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {station.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CONTINUE LISTENING RAIL (NEW) --- */}
      {recentlyPlayed.length > 0 && (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-lg font-bold mb-4">Continue Listening</h2>
          <div className="grid grid-cols-2 gap-3">
            {recentlyPlayed.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (item.type === "station") onStationClick(item);
                  if (item.type === "playlist") onPlaylistClick(item);
                  if (item.type === "podcast") onPodcastClick(item); // Re-open podcast detail
                }}
                className="flex items-center bg-[#1E1E1E] rounded-lg overflow-hidden cursor-pointer hover:bg-[#252525] transition-colors pr-2"
              >
                <img
                  src={item.img || item.image}
                  className="w-12 h-12 object-cover shrink-0"
                  alt={item.title || item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_FALLBACK_IMAGE;
                  }}
                />
                <div className="ml-3 flex-1 min-w-0 py-2">
                  <h4 className="text-white text-xs font-bold truncate leading-tight">
                    {item.title || item.name}
                  </h4>
                  <p className="text-gray-500 text-[10px] truncate capitalize mt-0.5">
                    {item.type === "station" ? "Live Radio" : item.type}
                  </p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Trending Podcasts</h2>
          <button
            onClick={onViewAllPodcasts}
            className="text-xs text-[#7F5AF0] font-bold"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {ALL_PODCASTS.slice(0, 3).map((pod, i) => {
            const isFav = favorites.some(
              (f) => f.type === "podcast" && f.id === pod.id
            );
            return (
              <div
                key={i}
                onClick={() => onPodcastClick(pod)}
                className="flex-shrink-0 w-36 group cursor-pointer"
              >
                <div className="w-36 h-36 bg-gray-800 rounded-xl mb-3 overflow-hidden relative">
                  <img
                    src={pod.img}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    alt={pod.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-black/60 backdrop-blur rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                  </div>
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(pod, "podcast");
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-bold text-sm leading-tight text-white mb-1">
                  {pod.title}
                </h3>
                <p className="text-xs text-gray-500">{pod.category}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Music Playlists</h2>
          <button
            onClick={onViewAllPlaylists}
            className="text-xs text-[#7F5AF0] font-bold"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {PLAYLISTS.map((playlist, i) => {
            const isFav = favorites.some(
              (f) => f.type === "playlist" && f.title === playlist.title
            ); // Using title as ID for playlists
            return (
              <div
                key={i}
                onClick={() => onPlaylistClick(playlist)}
                className="flex items-center gap-4 bg-[#1E1E1E] p-3 rounded-xl hover:bg-[#252525] transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-gray-800">
                  <img
                    src={playlist.img}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-white fill-current" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-white group-hover:text-[#7F5AF0] transition-colors">
                    {playlist.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {playlist.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(playlist, "playlist");
                    }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StationModal = ({
  station,
  onClose,
  isFavorite,
  onToggleFavorite,
  onPlaybackStatusChange,
}) => {
  const [activeTab, setActiveTab] = useState("Chat");
  const [mediaType, setMediaType] = useState("audio");
  const [isClosing, setIsClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };
  const tabs = [
    "Chat",
    "What's Played",
    "Latest Content",
    "Events",
    "Win",
    "Shop",
  ];

  useEffect(() => {
    // Notify App of playback status change
    if (onPlaybackStatusChange) {
      onPlaybackStatusChange({
        title: station.name,
        subtitle: station.show,
        img: station.img,
        isPlaying: isPlaying,
        type: "station",
      });
    }

    if (isPlaying && station.streamUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(station.streamUrl);
        audioRef.current.crossOrigin = "anonymous";
      }
      audioRef.current.play().catch((err) => {
        console.log(
          "Stream play error (might be format/browser support):",
          err
        );
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, station.streamUrl, station.name, station.show, station.img]);

  const renderTabContent = () => {
    if (activeTab === "Chat") {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
            {MOCK_CHAT.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.isBrand ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex items-baseline gap-2 mb-1 ${
                    msg.isBrand ? "flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      msg.isBrand ? "text-[#7F5AF0]" : "text-gray-400"
                    }`}
                  >
                    {msg.user}
                  </span>
                  {msg.isBrand && (
                    <div className="bg-[#7F5AF0] text-white text-[8px] px-1 rounded font-bold">
                      OFFICIAL
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${
                    msg.isBrand
                      ? "bg-[#7F5AF0] text-white rounded-tr-none"
                      : "bg-gray-800 text-white rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 bg-[#121212]">
            <div className="flex gap-2 bg-gray-900 rounded-full px-4 py-2 items-center">
              <input
                type="text"
                placeholder="Say something..."
                className="bg-transparent flex-1 text-sm text-white focus:outline-none placeholder-gray-500"
              />
              <Send className="w-4 h-4 text-[#7F5AF0]" />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "What's Played") {
      return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
          {MOCK_PLAYED_SONGS.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <img
                src={song.img}
                alt={song.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-sm truncate">
                  {song.title}
                </h4>
                <p className="text-gray-400 text-xs truncate">{song.artist}</p>
              </div>
              <span className="text-gray-500 text-xs font-medium">
                {song.time}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (
      activeTab === "Latest Content" ||
      activeTab === "Events" ||
      activeTab === "Win"
    ) {
      let content = [];
      if (activeTab === "Latest Content") content = LATEST_CONTENT_STORIES;
      if (activeTab === "Events") content = EVENTS_STORIES;
      if (activeTab === "Win") content = RAW_WINS;

      return <StoryGrid items={content} />;
    }

    if (activeTab === "Shop") {
      return <ShopGrid items={SHOP_ITEMS} />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500 gap-2">
        {activeTab === "Shop" ? (
          <ShoppingBag className="w-8 h-8 opacity-50" />
        ) : (
          <Clock className="w-8 h-8 opacity-50" />
        )}
        <p className="text-sm">No {activeTab.toLowerCase()} content.</p>
      </div>
    );
  };

  return (
    <div
      className={`absolute inset-0 z-[70] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="px-4 py-3 flex justify-between items-center sticky top-0 z-10 bg-[#121212] border-b border-white/5">
        <div className="flex flex-col items-center w-full relative">
          <button
            onClick={handleClose}
            className="absolute left-0 p-2 -ml-2 hover:bg-white/10 rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold text-sm tracking-wide">
            {station.name}
          </h1>
          <span className="text-[#7F5AF0] text-xs font-medium animate-pulse">
            ● LIVE: {station.show}
          </span>
          <div className="absolute right-0 flex items-center gap-1">
            <button
              onClick={onToggleFavorite}
              className="p-2 hover:bg-white/10 rounded-full text-white"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden shrink-0">
          {mediaType === "video" ? (
            // Use station.videoStreamUrl if available (for The Rock HLS stream)
            station.videoStreamUrl ? (
              <div className="w-full h-full relative">
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                  src={station.videoStreamUrl}
                >
                  Your browser does not support HLS playback natively.
                </video>
                {/* Fallback overlay for browsers that don't support native HLS */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white p-4 text-center pointer-events-none md:hidden">
                  <p className="text-xs">
                    Video streaming requires native HLS support (Safari/Mobile).
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&controls=0&loop=1&playlist=5qap5aO4i9A&modestbranding=1"
                title="Live Stream"
                frameBorder="0"
                allow="autoplay; encrypted-media"
              />
            )
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 to-[#121212] z-10"></div>
              <div className="relative z-20">
                <StationAvatar station={station} size="w-32 h-32" />
              </div>
              <div className="absolute bottom-4 flex gap-1 z-20 items-end h-8">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-[#7F5AF0] rounded-t-sm ${
                      isPlaying ? "animate-pulse" : "h-2"
                    }`}
                    style={{
                      height: isPlaying ? `${Math.random() * 100}%` : "4px",
                    }}
                  ></div>
                ))}
              </div>
            </>
          )}
          <div className="absolute inset-0 z-30 flex flex-col justify-between p-4 pointer-events-none">
            <div className="flex justify-end pointer-events-auto">
              <div className="bg-black/50 backdrop-blur rounded-full p-1 flex items-center border border-white/10">
                <button
                  onClick={() => setMediaType("audio")}
                  className={`p-2 rounded-full transition-colors ${
                    mediaType === "audio"
                      ? "bg-[#7F5AF0] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMediaType("video")}
                  className={`p-2 rounded-full transition-colors ${
                    mediaType === "video"
                      ? "bg-[#7F5AF0] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Tv className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center pointer-events-auto">
              {mediaType === "audio" && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-black fill-current" />
                  ) : (
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  )}
                </button>
              )}
            </div>
            <div className="h-8"></div>
          </div>
        </div>
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-[#121212]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const ArticleModal = ({ item, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative h-72 shrink-0">
        <img
          src={item.image}
          className="w-full h-full object-cover"
          alt={item.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#121212]" />
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur rounded-full text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            {item.tags &&
              item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#7F5AF0] text-white px-2 py-1 text-[10px] font-bold rounded uppercase"
                >
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="text-2xl font-black text-white leading-tight mb-1">
            {item.title}
          </h1>
          <p className="text-gray-300 text-sm">{item.subtitle}</p>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <p className="text-white leading-relaxed mb-6">{item.content}</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

const PlaylistModal = ({ playlist, onClose, onPlaybackStatusChange }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    // Notify App of playback status
    if (onPlaybackStatusChange) {
      onPlaybackStatusChange({
        title: playlist.title,
        subtitle: playlist.subtitle || "Music Playlist",
        img: playlist.img,
        isPlaying: isPlaying,
        type: "playlist",
      });
    }

    if (isPlaying && playlist.streamUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(playlist.streamUrl);
      }
      audioRef.current.play().catch((err) => {
        console.log("Playback error:", err);
        setIsPlaying(false);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Clean up
      }
    };
  }, [
    isPlaying,
    playlist.streamUrl,
    playlist.title,
    playlist.img,
    playlist.subtitle,
  ]);

  if (!playlist) return null;

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col bg-[#121212] transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative h-64 shrink-0">
        <img
          src={playlist.img}
          className="w-full h-full object-cover"
          alt={playlist.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#121212]" />
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur rounded-full text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-2">{playlist.title}</h1>
        {playlist.subtitle && (
          <p className="text-gray-400 text-sm mb-6">{playlist.subtitle}</p>
        )}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-[#7F5AF0] text-white font-bold py-3 rounded-full mb-8 flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" /> Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" /> Play
            </>
          )}
        </button>
        <div className="space-y-4">
          {playlist.tracks &&
            playlist.tracks.map((track, i) => (
              <div key={i} className="flex items-center gap-4 text-white">
                <span className="text-gray-500 font-bold text-sm w-4">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{track.title}</p>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                <span className="text-xs text-gray-500">{track.time}</span>
              </div>
            ))}
          {(!playlist.tracks || playlist.tracks.length === 0) && (
            <p className="text-gray-500 text-sm italic">Tracks loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  // --- NEW STATE FOR MINI PLAYER ---
  const [currentTrack, setCurrentTrack] = useState({
    title: "The Rock Drive",
    subtitle: "Jay & Dunc - Live Now",
    img: "https://yt3.googleusercontent.com/ytc/AIdro_mnoQI2A9zTrepmqC964GfcrzsGDyykJGB4v2-2SuDuOr4=s160-c-k-c0x00ffffff-no-rj",
    isPlaying: false,
  });

  const [viewAllRadio, setViewAllRadio] = useState(false);
  const [viewAllPodcasts, setViewAllPodcasts] = useState(false);
  const [viewAllPlaylists, setViewAllPlaylists] = useState(false);
  const [viewAllVideos, setViewAllVideos] = useState(false);
  const [viewAllNews, setViewAllNews] = useState(false);
  const [viewAllEvents, setViewAllEvents] = useState(false);
  const [viewAllShop, setViewAllShop] = useState(false);
  const [viewAllWin, setViewAllWin] = useState(false);

  const [showFullScreenPlayer, setShowFullScreenPlayer] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // --- NEW STATES FOR INTERACTIONS ---
  const [likedItems, setLikedItems] = useState({});
  const [commentsOpenForItem, setCommentsOpenForItem] = useState(null);

  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // --- STREAM FAVORITES STATE ---
  const [streamFavorites, setStreamFavorites] = useState([]);

  // --- RECENTLY PLAYED STATE (CONTINUE LISTENING) ---
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // --- SWIPE LOGIC ---
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchEndY.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const xDistance = touchStartX.current - touchEndX.current;
    const yDistance = touchStartY.current - touchEndY.current;

    if (Math.abs(yDistance) >= Math.abs(xDistance)) return;

    const isLeftSwipe = xDistance > minSwipeDistance;
    const isRightSwipe = xDistance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (activeTab === "stream") setActiveTab("explore");
      else if (activeTab === "explore") setActiveTab("search");
    }
    if (isRightSwipe) {
      if (activeTab === "search") setActiveTab("explore");
      else if (activeTab === "explore") setActiveTab("stream");
    }
  };

  // Helper to handle playback status updates from children
  const handlePlaybackStatusChange = (trackInfo) => {
    setCurrentTrack(trackInfo);
  };

  // Toggle Like Handler
  const handleToggleLike = (key) => {
    setLikedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Helper to add item to Recently Played history
  const addToRecentlyPlayed = (item, type) => {
    setRecentlyPlayed((prev) => {
      // Determine unique ID or Title
      const uniqueId = item.id || item.title;
      // Remove if exists
      const filtered = prev.filter((i) => (i.id || i.title) !== uniqueId);
      // Add new to top
      const newItem = { ...item, type };
      return [newItem, ...filtered].slice(0, 6);
    });
  };

  const handleToggleStreamFavorite = (item, type) => {
    setStreamFavorites((prev) => {
      // Determine unique ID for item (Playlists might only have title)
      const itemId = item.id || item.title;
      const exists = prev.some((fav) => {
        const favId = fav.id || fav.title;
        return favId === itemId && fav.type === type;
      });

      if (exists) {
        return prev.filter((fav) => {
          const favId = fav.id || fav.title;
          return !(favId === itemId && fav.type === type);
        });
      } else {
        return [...prev, { ...item, type }];
      }
    });
  };

  const feedData = useMemo(() => {
    const allContent = [
      ...RAW_ARTICLES,
      ...RAW_VIDEOS,
      ...RAW_EVENTS,
      ...RAW_WINS,
    ];
    for (let i = allContent.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allContent[i], allContent[j]] = [allContent[j], allContent[i]];
    }
    const finalFeed = [];
    let contentCount = 0;
    let adIndex = 0;
    for (const item of allContent) {
      finalFeed.push(item);
      contentCount++;
      if (contentCount % 4 === 0) {
        finalFeed.push(ADS[adIndex % ADS.length]);
        adIndex++;
      }
    }
    return finalFeed;
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans p-4">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[40px] border-8 border-gray-900 shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute top-0 w-full h-12 z-50 flex justify-between items-end px-6 pb-2 pointer-events-none">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="flex gap-1.5">
            <div className="w-4 h-2.5 bg-white rounded-[2px] opacity-100"></div>
            <div className="w-0.5 h-2.5 bg-white rounded-[1px] opacity-100"></div>
          </div>
        </div>

        {/* Account Button */}
        {activeTab === "search" && (
          <button
            onClick={() => setShowAccountModal(true)}
            className="absolute top-12 right-5 z-40 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        )}

        <div
          className="flex-1 bg-[#121212] relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {activeTab === "stream" && (
            <StreamDashboard
              onPlaylistClick={(playlist) => {
                addToRecentlyPlayed(playlist, "playlist");
                setSelectedPlaylist(playlist);
              }}
              onStationClick={(station) => {
                addToRecentlyPlayed(station, "station");
                setSelectedStation(station);
              }}
              onViewAllRadio={() => setViewAllRadio(true)}
              onViewAllPodcasts={() => setViewAllPodcasts(true)}
              onViewAllPlaylists={() => setViewAllPlaylists(true)}
              onPodcastClick={setSelectedPodcast} // Access details first
              favorites={streamFavorites}
              onToggleFavorite={handleToggleStreamFavorite}
              onNavigateToSearch={() => setActiveTab("search")}
              recentlyPlayed={recentlyPlayed}
            />
          )}
          {activeTab === "explore" && (
            <ExploreFeed
              feedData={feedData}
              onItemClick={(item) => setSelectedArticle(item)}
              likedItems={likedItems}
              onToggleLike={handleToggleLike}
              onOpenComments={setCommentsOpenForItem}
            />
          )}
          {activeTab === "search" && (
            <div className="h-full bg-[#121212] px-6 pt-20 overflow-y-auto pb-32 no-scrollbar">
              <h1 className="text-3xl font-black text-white text-center mb-6">
                What are you
                <br />
                looking for?
              </h1>
              <div className="relative mb-12">
                <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#1E1E1E] rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#7F5AF0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CategoryButton
                  icon={<Radio />}
                  label="Radio"
                  onClick={() => setViewAllRadio(true)}
                />
                <CategoryButton
                  icon={<Mic />}
                  label="Podcasts"
                  onClick={() => setViewAllPodcasts(true)}
                />
                <CategoryButton
                  icon={<Music />}
                  label="Playlists"
                  onClick={() => setViewAllPlaylists(true)}
                />
                <CategoryButton
                  icon={<Calendar />}
                  label="Events"
                  onClick={() => setViewAllEvents(true)}
                />
                <CategoryButton
                  icon={<Tv />}
                  label="Videos"
                  onClick={() => setViewAllVideos(true)}
                />
                <CategoryButton
                  icon={<Newspaper />}
                  label="News"
                  onClick={() => setViewAllNews(true)}
                />
                <CategoryButton
                  icon={<Trophy />}
                  label="Win"
                  onClick={() => setViewAllWin(true)}
                />
                <CategoryButton
                  icon={<ShoppingBag />}
                  label="Shop"
                  onClick={() => setViewAllShop(true)}
                />
              </div>
            </div>
          )}

          <MiniPlayer
            visible={activeTab !== "explore"}
            onClick={() => setShowFullScreenPlayer(true)}
            currentTrack={currentTrack}
          />

          {showFullScreenPlayer && (
            <FullScreenPlayerModal
              onClose={() => setShowFullScreenPlayer(false)}
            />
          )}
          {showAccountModal && (
            <AccountSettingsView onClose={() => setShowAccountModal(false)} />
          )}

          {/* New Comments Modal */}
          {commentsOpenForItem && (
            <CommentsModal
              item={commentsOpenForItem}
              onClose={() => setCommentsOpenForItem(null)}
            />
          )}

          {/* Standard Modals */}
          {selectedArticle && (
            <ArticleModal
              item={selectedArticle}
              onClose={() => setSelectedArticle(null)}
            />
          )}
          {selectedPlaylist && (
            <PlaylistModal
              playlist={selectedPlaylist}
              onClose={() => setSelectedPlaylist(null)}
              onPlaybackStatusChange={handlePlaybackStatusChange}
            />
          )}
          {selectedStation && (
            <StationModal
              station={selectedStation}
              onClose={() => setSelectedStation(null)}
              isFavorite={streamFavorites.some(
                (f) => f.type === "station" && f.id === selectedStation.id
              )}
              onToggleFavorite={() =>
                handleToggleStreamFavorite(selectedStation, "station")
              }
              onPlaybackStatusChange={handlePlaybackStatusChange}
            />
          )}

          {/* New Feature Views */}
          {viewAllRadio && (
            <AllStationsView
              onClose={() => setViewAllRadio(false)}
              onStationClick={(station) => {
                addToRecentlyPlayed(station, "station");
                setSelectedStation(station);
              }}
            />
          )}
          {viewAllPodcasts && (
            <AllPodcastsView
              onClose={() => setViewAllPodcasts(false)}
              onPodcastClick={setSelectedPodcast}
              onEpisodeClick={(ep, pod) => {
                // Tracking history on episode click from 'All Podcasts'
                // Reconstruct full podcast object slightly or use what's available
                addToRecentlyPlayed(
                  { ...pod, title: pod.title, img: pod.img },
                  "podcast"
                );
                setSelectedEpisode({
                  ...ep,
                  podcastTitle: pod.title,
                  img: pod.img,
                });
              }}
            />
          )}
          {viewAllPlaylists && (
            <AllMusicPlaylistsView
              onClose={() => setViewAllPlaylists(false)}
              onPlaylistClick={(playlist) => {
                addToRecentlyPlayed(playlist, "playlist");
                setSelectedPlaylist(playlist);
              }}
            />
          )}
          {viewAllVideos && (
            <AllVideosView onClose={() => setViewAllVideos(false)} />
          )}
          {viewAllNews && (
            <AllNewsView
              onClose={() => setViewAllNews(false)}
              onArticleClick={setSelectedArticle}
            />
          )}
          {viewAllEvents && (
            <AllEventsView onClose={() => setViewAllEvents(false)} />
          )}
          {viewAllWin && <AllWinView onClose={() => setViewAllWin(false)} />}
          {viewAllShop && <AllShopView onClose={() => setViewAllShop(false)} />}

          {selectedPodcast && (
            <PodcastDetailModal
              podcast={selectedPodcast}
              onClose={() => setSelectedPodcast(null)}
              onEpisodeClick={(ep) => {
                // Add podcast to history when episode is clicked
                addToRecentlyPlayed(selectedPodcast, "podcast");
                setSelectedEpisode({
                  ...ep,
                  podcastTitle: selectedPodcast.title,
                  img: selectedPodcast.img,
                });
              }}
            />
          )}
          {selectedEpisode && (
            <PodcastPlayerModal
              episode={selectedEpisode}
              podcast={{
                title: selectedEpisode.podcastTitle,
                img: selectedEpisode.img,
              }}
              onClose={() => setSelectedEpisode(null)}
              // Note: PodcastPlayerModal isn't fully updated with onPlaybackStatusChange in this diff to keep it focused,
              // but it would follow the same pattern if needed. Since Station and Playlist were the primary requests:
            />
          )}
        </div>

        <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
