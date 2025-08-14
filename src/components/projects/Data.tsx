import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';
import { useState } from 'react';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Titans',
    description:
      '"Company Titans" - a YouTube channel packed with mesmerizing tales from the business world. Despite having just 337 subscribers, our videos are nothing short of extraordinary, showcasing stories that blend intrigue, drama, and history.\n\nDespite the high-quality and professional nature of these videos, the channel sadly had to stop after just seven episodes due to budget constraints and the client\'s bankruptcy. However, the stories we told during that time remain some of the best work I\'ve ever done as a video editor.',
    techStack: [
      'YouTube Video',
      'Video Editing',
      'Motion Graphics',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Faceless Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/ra6yeBDNl84/maxresdefault.jpg',
        alt: 'Titans Episode 1',
      },
      {
        src: 'https://img.youtube.com/vi/IxaW_OWmLtk/maxresdefault.jpg',
        alt: 'Titans Episode 2',
      },
      {
        src: 'https://img.youtube.com/vi/KbnJBZ1zRJg/maxresdefault.jpg',
        alt: 'Titans Episode 3',
      },
      {
        src: 'https://img.youtube.com/vi/yceBueKTRNA/maxresdefault.jpg',
        alt: 'Titans Episode 4',
      },
      {
        src: 'https://img.youtube.com/vi/gtxfCcMXrdE/maxresdefault.jpg',
        alt: 'Titans Episode 5',
      },
      {
        src: 'https://img.youtube.com/vi/rFs4CVgO_ww/maxresdefault.jpg',
        alt: 'Titans Episode 6',
      },
      {
        src: 'https://img.youtube.com/vi/L23dLbSPzVM/maxresdefault.jpg',
        alt: 'Titans Episode 7',
      },
      {
        src: 'https://img.youtube.com/vi/MK38wOYhfUg/maxresdefault.jpg',
        alt: 'Titans Episode 8',
      },
    ],
  },
  {
    title: 'Richest',
    description:
      'I had the opportunity to work with TheRichest, a top YouTube channel with 14.9 million subscribers, where I contributed to 8–10 full-length videos and assisted on over 20 more during my 2–3 month tenure. This experience sharpened my editing skills and gave me valuable insights into content creation, YouTube strategy, and high-performing video production.',
    techStack: [
      'YouTube Video',
      'Video Editing',
      'Motion Graphics',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Faceless Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/5noMYVoZzi4/maxresdefault.jpg',
        alt: 'TheRichest Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/bYxDwcrJvGM/maxresdefault.jpg',
        alt: 'TheRichest Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/FG9VzxYgys4/maxresdefault.jpg',
        alt: 'TheRichest Video 3',
      },
      {
        src: 'https://img.youtube.com/vi/qBjaIPWc-kE/maxresdefault.jpg',
        alt: 'TheRichest Video 4',
      },
      {
        src: 'https://img.youtube.com/vi/Sa06Uo_mH1c/maxresdefault.jpg',
        alt: 'TheRichest Video 5',
      },
      {
        src: 'https://img.youtube.com/vi/jVq2hAvYzlw/maxresdefault.jpg',
        alt: 'TheRichest Video 6',
      },
      {
        src: 'https://img.youtube.com/vi/qkEbbC-1cHQ/maxresdefault.jpg',
        alt: 'TheRichest Video 7',
      },
      {
        src: 'https://img.youtube.com/vi/rZyt9GVuAqs/maxresdefault.jpg',
        alt: 'TheRichest Video 8',
      },
      {
        src: 'https://img.youtube.com/vi/xQLeaXZb0jo/maxresdefault.jpg',
        alt: 'TheRichest Video 9',
      },
    ],
  },
  {
    title: 'Royal',
    description:
      'For one of my UK-based clients, I produced a series of engaging videos centered on the British Royal Family, blending historical insights with compelling visuals to captivate his audience.',
    techStack: [
      'YouTube Video',
      'Video Editing',
      'Motion Graphics',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Faceless Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/tZYei6r5Ob8/maxresdefault.jpg',
        alt: 'Royal Family Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/ZD4br2IC_zM/maxresdefault.jpg',
        alt: 'Royal Family Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/VOQ_VH6EFF8/maxresdefault.jpg',
        alt: 'Royal Family Video 3',
      },
      {
        src: 'https://img.youtube.com/vi/4V7GMmVNt0A/maxresdefault.jpg',
        alt: 'Royal Family Video 4',
      },
      {
        src: 'https://img.youtube.com/vi/fgCuEl_EelA/maxresdefault.jpg',
        alt: 'Royal Family Video 5',
      },
    ],
  },
  {
    title: 'Health',
    description:
      'For the "Goodness Nature" YouTube channel, I created informative and visually appealing videos focused on health, nutrition, and natural wellness. The content was designed to educate and inspire viewers.',
    techStack: [
      'YouTube Video',
      'Video Editing',
      'Motion Graphics',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Faceless Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/N-VHoFjbe0w/maxresdefault.jpg',
        alt: 'Health & Wellness Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/ebCjwjwwdR4/maxresdefault.jpg',
        alt: 'Health & Wellness Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/snsT-x61pfs/maxresdefault.jpg',
        alt: 'Health & Wellness Video 3',
      },
      {
        src: 'https://img.youtube.com/vi/IuDTpBG-bxc/maxresdefault.jpg',
        alt: 'Health & Wellness Video 4',
      },
      {
        src: 'https://img.youtube.com/vi/regW6ofA-_E/maxresdefault.jpg',
        alt: 'Health & Wellness Video 5',
      },
      {
        src: 'https://img.youtube.com/vi/2y2StmMve68/maxresdefault.jpg',
        alt: 'Health & Wellness Video 6',
      },
    ],
  },
  {
    title: 'Psychology',
    description:
      'For the "Self-Made Mind" YouTube channel, I produced impactful videos focused on personal development and psychology, designed to empower viewers on their journey toward self-improvement. Each video was crafted to deliver clear, actionable insights on topics like mindset, emotional intelligence, and motivation presented in an engaging and visually compelling format to inspire lasting change and personal growth.',
    techStack: [
      'YouTube Video',
      'Video Editing',
      'Motion Graphics',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Faceless Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/I5g1TuW47wE/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/9R4z37-jnb4/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/vLZOaIOivd8/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 3',
      },
      {
        src: 'https://img.youtube.com/vi/CTjzCN6AQKU/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 4',
      },
      {
        src: 'https://img.youtube.com/vi/jCjkZt42QLs/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 5',
      },
      {
        src: 'https://img.youtube.com/vi/r0Kjp6ZKUVE/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 6',
      },
      {
        src: 'https://img.youtube.com/vi/b_SuPKs2fkk/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 7',
      },
      {
        src: 'https://img.youtube.com/vi/BBe-53IpLqA/maxresdefault.jpg',
        alt: 'Psychology & Self-Development Video 8',
      },
    ],
  },
  {
    title: 'Viral 3D',
    description:
      'I have crafted highly creative and visually stunning 3D viral reels for multiple clients, focusing on delivering content that captures attention and encourages sharing. Each reel is meticulously designed to combine cutting-edge 3D animation with compelling storytelling, resulting in short-form content that resonates deeply with viewers.',
    techStack: [
      'Instagram Reels',
      'Youtube Shorts',
      'Tiktok',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Video Ad',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/i-JhZyUjCQw/maxresdefault.jpg',
        alt: 'Viral 3D Reel 1',
      },
      {
        src: 'https://img.youtube.com/vi/WGgdP2oyd7E/maxresdefault.jpg',
        alt: 'Viral 3D Reel 2',
      },
      {
        src: 'https://img.youtube.com/vi/hEkoTr9jidg/maxresdefault.jpg',
        alt: 'Viral 3D Reel 3',
      },
      {
        src: 'https://img.youtube.com/vi/M_JrUj3rc7E/maxresdefault.jpg',
        alt: 'Viral 3D Reel 4',
      },
      {
        src: 'https://img.youtube.com/vi/B4ga-w2EIag/maxresdefault.jpg',
        alt: 'Viral 3D Reel 5',
      },
      {
        src: 'https://img.youtube.com/vi/Mdr5i8Ys-_E/maxresdefault.jpg',
        alt: 'Viral 3D Reel 6',
      },
      {
        src: 'https://img.youtube.com/vi/D9e96dcTfeA/maxresdefault.jpg',
        alt: 'Viral 3D Reel 7',
      },
    ],
  },
  {
    title: 'Wildlife',
    description:
      'For the Youtube Channel: Shadows of Secrets, I have been assitant video editor for last few months. I helped them create some of top engaging content and worked along with team to gain experience in this niche.',
    techStack: [
      'Instagram Reels',
      'Youtube Shorts',
      'Tiktok',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/RHziFE4tG9o/maxresdefault.jpg',
        alt: 'Wildlife Short 1',
      },
      {
        src: 'https://img.youtube.com/vi/EGA3tBWFE70/maxresdefault.jpg',
        alt: 'Wildlife Short 2',
      },
      {
        src: 'https://img.youtube.com/vi/qCCMVeten2k/maxresdefault.jpg',
        alt: 'Wildlife Short 3',
      },
      {
        src: 'https://img.youtube.com/vi/3bJhO71boUw/maxresdefault.jpg',
        alt: 'Wildlife Short 4',
      },
      {
        src: 'https://img.youtube.com/vi/y8r1GC2aPWY/maxresdefault.jpg',
        alt: 'Wildlife Short 5',
      },
      {
        src: 'https://img.youtube.com/vi/p3h5ff7wJ9U/maxresdefault.jpg',
        alt: 'Wildlife Short 6',
      },
      {
        src: 'https://img.youtube.com/vi/sSucOVi4C_Q/maxresdefault.jpg',
        alt: 'Wildlife Short 7',
      },
      {
        src: 'https://img.youtube.com/vi/GhzxHePVPmk/maxresdefault.jpg',
        alt: 'Wildlife Short 8',
      },
    ],
  },
  {
    title: 'Sports',
    description:
      'I have worked with Full Throttle F1 to create viral short-form videos showcasing the latest Formula 1 stories, unbelievable facts, and legendary moments from the sport\'s history. Focused on crafting high-retention content optimized for YouTube Shorts and social media. Helped grow audience engagement through compelling visuals and storytelling.',
    techStack: [
      'Instagram Reels',
      'Youtube Shorts',
      'Tiktok',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Videos',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/5k5grzcY9-U/maxresdefault.jpg',
        alt: 'F1 Sports Short 1',
      },
      {
        src: 'https://img.youtube.com/vi/PgNVdCKkqFM/maxresdefault.jpg',
        alt: 'F1 Sports Short 2',
      },
      {
        src: 'https://img.youtube.com/vi/UR7076QsCGk/maxresdefault.jpg',
        alt: 'F1 Sports Short 3',
      },
      {
        src: 'https://img.youtube.com/vi/BBEOFFf2ac4/maxresdefault.jpg',
        alt: 'F1 Sports Short 4',
      },
      {
        src: 'https://img.youtube.com/vi/UFoGIBvI7lQ/maxresdefault.jpg',
        alt: 'F1 Sports Short 5',
      },
      {
        src: 'https://img.youtube.com/vi/MNR9iY1CViI/maxresdefault.jpg',
        alt: 'F1 Sports Short 6',
      },
      {
        src: 'https://img.youtube.com/vi/KhsWFxzvX-o/maxresdefault.jpg',
        alt: 'F1 Sports Short 7',
      },
      {
        src: 'https://img.youtube.com/vi/ofm2hZZR8bk/maxresdefault.jpg',
        alt: 'F1 Sports Short 8',
      },
      {
        src: 'https://img.youtube.com/vi/NP4RLipfkDY/maxresdefault.jpg',
        alt: 'F1 Sports Short 9',
      },
      {
        src: 'https://img.youtube.com/vi/pHkxU7pJlfI/maxresdefault.jpg',
        alt: 'F1 Sports Short 10',
      },
      {
        src: 'https://img.youtube.com/vi/vhjO8fPsKik/maxresdefault.jpg',
        alt: 'F1 Sports Short 11',
      },
      {
        src: 'https://img.youtube.com/vi/aw8nU7ubVvM/maxresdefault.jpg',
        alt: 'F1 Sports Short 12',
      },
      {
        src: 'https://img.youtube.com/vi/AlejuoZ-Ths/maxresdefault.jpg',
        alt: 'F1 Sports Short 13',
      },
      {
        src: 'https://img.youtube.com/vi/KGzduOWdISI/maxresdefault.jpg',
        alt: 'F1 Sports Short 14',
      },
    ],
  },
  {
    title: 'Book Cover Hub',
    description:
      'I worked with BookCoverHub, a company specializing in book covers, to enhance their online presence through creative visual content. I developed viral video ads for Instagram, Facebook, and TikTok, as well as numerous graphics, all aimed at boosting brand visibility and engagement.',
    techStack: [
      'Instagram Reels',
      'Eccomerce',
      'Tiktok',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Video Ad',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/810o-wjmuVs/maxresdefault.jpg',
        alt: 'Book Cover Hub Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/KXUvdwOoHi4/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 1',
      },
      {
        src: 'https://img.youtube.com/vi/p0LWlRbp9sk/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 2',
      },
      {
        src: 'https://img.youtube.com/vi/pb1q-cR7F54/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 3',
      },
      {
        src: 'https://img.youtube.com/vi/HEo84rhXJFI/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 4',
      },
      {
        src: 'https://img.youtube.com/vi/8n67RMrdyng/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 5',
      },
      {
        src: 'https://img.youtube.com/vi/YIZlEOSsDTE/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 6',
      },
      {
        src: 'https://img.youtube.com/vi/zJuFBd5-wOk/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 7',
      },
      {
        src: 'https://img.youtube.com/vi/5iMY8IMB8cA/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 8',
      },
      {
        src: 'https://img.youtube.com/vi/LcnA3FvYsW8/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 9',
      },
      {
        src: 'https://img.youtube.com/vi/SyqpbF_cHOs/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 10',
      },
      {
        src: 'https://img.youtube.com/vi/3EAh8H7p_0g/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 11',
      },
      {
        src: 'https://img.youtube.com/vi/6QZNQ5VRDIU/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 12',
      },
      {
        src: 'https://img.youtube.com/vi/oWFHQwxM9k4/maxresdefault.jpg',
        alt: 'Book Cover Hub Short 13',
      },
      {
        src: 'https://img.youtube.com/vi/oHg1-vmLeI8/maxresdefault.jpg',
        alt: 'Book Cover Hub Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/VglpZNq7-4A/maxresdefault.jpg',
        alt: 'Book Cover Hub Video 3',
      },
    ],
  },
  {
    title: 'T-Shirt Brand',
    description:
      'As the creative head for Trufanism, a t-shirt brand, I was responsible for creating compelling video ads and promo videos that resonated with the brand\'s target audience. My work focused on capturing the essence of Trufanism\'s unique style and translating it into visually engaging content that effectively communicated the brand\'s message.',
    techStack: [
      'Ecommerce',
      'Instagram Reels',
      'Product Promotion',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Video Ad',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/PJ3jm5xxUk4/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 1',
      },
      {
        src: 'https://img.youtube.com/vi/dFYD0d3CzNc/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 2',
      },
      {
        src: 'https://img.youtube.com/vi/WBRqy_e7Lv0/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 3',
      },
      {
        src: 'https://img.youtube.com/vi/Npqph-a-vnE/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 4',
      },
      {
        src: 'https://img.youtube.com/vi/bv1vnJ1Kf2s/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 5',
      },
      {
        src: 'https://img.youtube.com/vi/UnMjNbGLAbc/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 6',
      },
      {
        src: 'https://img.youtube.com/vi/0TkjGl2bwIE/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 7',
      },
      {
        src: 'https://img.youtube.com/vi/Q-4Y4TDVGWo/maxresdefault.jpg',
        alt: 'T-Shirt Brand Video 8',
      },
    ],
  },
  {
    title: 'Farmers4u',
    description:
      'I served as the creative manager for Farmers4u, an e-commerce platform selling fresh fruits and vegetables online. My work included designing high-quality, engaging graphics and producing promotional videos tailored for social media channels like Facebook and Instagram, helping to boost brand visibility and audience engagement.',
    techStack: [
      'Ecommerce',
      'Instagram Reels',
      'Graphic Design',
      'Product Promotion',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Video Ad',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/laCouzGYZGU/maxresdefault.jpg',
        alt: 'Farmers4u Promotional Video',
      },
      {
        src: '/fruits/01.webp',
        alt: 'Farmers4u Fruits Image 1',
      },
      {
        src: '/fruits/02.webp',
        alt: 'Farmers4u Fruits Image 2',
      },
      {
        src: '/fruits/03.webp',
        alt: 'Farmers4u Fruits Image 3',
      },
      {
        src: '/fruits/04.webp',
        alt: 'Farmers4u Fruits Image 4',
      },
      {
        src: '/fruits/05.webp',
        alt: 'Farmers4u Fruits Image 5',
      },
      {
        src: '/fruits/06.webp',
        alt: 'Farmers4u Fruits Image 6',
      },
      {
        src: '/fruits/07.webp',
        alt: 'Farmers4u Fruits Image 7',
      },
      {
        src: '/fruits/08.webp',
        alt: 'Farmers4u Fruits Image 8',
      },
      {
        src: '/fruits/09.webp',
        alt: 'Farmers4u Fruits Image 9',
      },
      {
        src: '/fruits/10.webp',
        alt: 'Farmers4u Fruits Image 10',
      },
      {
        src: '/fruits/11.webp',
        alt: 'Farmers4u Fruits Image 11',
      },
      {
        src: '/fruits/12.webp',
        alt: 'Farmers4u Fruits Image 12',
      },
      {
        src: '/fruits/13.webp',
        alt: 'Farmers4u Fruits Image 13',
      },
      {
        src: '/fruits/14.webp',
        alt: 'Farmers4u Fruits Image 14',
      },
      {
        src: '/fruits/15.webp',
        alt: 'Farmers4u Fruits Image 15',
      },
      {
        src: '/fruits/16.webp',
        alt: 'Farmers4u Fruits Image 16',
      },
    ],
  },
  {
    title: 'Amedeo Exclusive',
    description:
      'I used to work as an employee at very reputated marketing agency and from that agency I got the opportunity to work with one of the leading fashion brands in Canada, Amedeo Exclusive. They also have partnered with Prosche and we created amazing content for both the companies',
    techStack: [
      'Ecommerce',
      'Brand Marketing',
      'Graphic Design',
      'Product Promotion',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Short Video Ad',
    ],
    date: '2024',
    images: [
      {
        src: 'https://img.youtube.com/vi/SMT3GJEZ8j8/maxresdefault.jpg',
        alt: 'Amedeo Exclusive Promotional Video 1',
      },
      {
        src: '/amedeo/long banner-1.jpg',
        alt: 'Amedeo Long Banner 1',
      },
      {
        src: '/amedeo/long banner-2.jpg',
        alt: 'Amedeo Long Banner 2',
      },
      {
        src: '/amedeo/long banner-3.jpg',
        alt: 'Amedeo Long Banner 3',
      },
      {
        src: 'https://img.youtube.com/vi/ONLPHzzviAY/maxresdefault.jpg',
        alt: 'Amedeo Exclusive Promotional Video 2',
      },
      {
        src: '/amedeo/bag image.jpg',
        alt: 'Amedeo Bag Image',
      },
      {
        src: '/amedeo/product-1.jpg',
        alt: 'Amedeo Product 1',
      },
      {
        src: '/amedeo/product-2.jpg',
        alt: 'Amedeo Product 2',
      },
      {
        src: '/amedeo/product-3.jpg',
        alt: 'Amedeo Product 3',
      },
      {
        src: '/amedeo/product-4.jpg',
        alt: 'Amedeo Product 4',
      },
      {
        src: '/amedeo/product-5.jpg',
        alt: 'Amedeo Product 5',
      },
      {
        src: '/amedeo/product-6.jpg',
        alt: 'Amedeo Product 6',
      },
      {
        src: '/amedeo/product-7.jpg',
        alt: 'Amedeo Product 7',
      },
      {
        src: '/amedeo/product-8.jpg',
        alt: 'Amedeo Product 8',
      },
      {
        src: '/amedeo/product-9.jpg',
        alt: 'Amedeo Product 9',
      },
      {
        src: '/amedeo/product-10.jpg',
        alt: 'Amedeo Product 10',
      },
      {
        src: '/amedeo/product-11.jpg',
        alt: 'Amedeo Product 11',
      },
      {
        src: '/amedeo/product-12.jpg',
        alt: 'Amedeo Product 12',
      },
      {
        src: '/amedeo/product-13.jpg',
        alt: 'Amedeo Product 13',
      },
      {
        src: '/amedeo/product-14.jpg',
        alt: 'Amedeo Product 14',
      },
      {
        src: '/amedeo/product-15.jpg',
        alt: 'Amedeo Product 15',
      },
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {project.links && project.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {project.links.map((link: { name: string; url: string }, index: number) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">

          
          {/* Special handling for Farmers4u - YouTube video first, then images in 2-column grid */}
          {projectData.title === 'Farmers4u' ? (
            <>
              {/* YouTube video - full width - ALWAYS SHOW THIS */}
              {(() => {
                const youtubeImage = projectData.images.find(img => img.src.includes('img.youtube.com/vi/'));
                if (youtubeImage) {
                  const match = youtubeImage.src.match(/img.youtube.com\/vi\/([^/]+)\//);
                  const videoId = match ? match[1] : null;
                  
                  if (playingVideo === videoId) {
                    return (
                      <div key="youtube-video" className="relative aspect-video overflow-hidden rounded-2xl">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          title={youtubeImage.alt}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors"
                          title="Close video"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }
                  
                             return (
             <button
               key="youtube-thumbnail"
               onClick={() => setPlayingVideo(videoId)}
               className="block relative aspect-video overflow-hidden rounded-2xl group"
             >
               <img
                 src={youtubeImage.src}
                 alt={youtubeImage.alt}
                 className="w-full h-full object-cover transition-transform group-hover:scale-105"
               />
               <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7"/>
                   <polygon points="26,20 48,32 26,44" fill="#e53e3e"/>
                 </svg>
               </span>
             </button>
           );
                }
                // If no YouTube image found, show a placeholder or error
                return (
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">YouTube video not found</p>
                  </div>
                );
              })()}
              
              {/* Fruits images - 2-column grid */}
              <div className="grid grid-cols-2 gap-4">
                {projectData.images.filter(img => !img.src.includes('img.youtube.com/vi/')).map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain transition-transform"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : projectData.title === 'Amedeo Exclusive' ? (
            <>
              {/* First YouTube video - full width */}
              {(() => {
                const firstYoutubeImage = projectData.images.find(img => img.src.includes('img.youtube.com/vi/SMT3GJEZ8j8'));
                if (firstYoutubeImage) {
                  const match = firstYoutubeImage.src.match(/img.youtube.com\/vi\/([^/]+)\//);
                  const videoId = match ? match[1] : null;
                  
                  if (playingVideo === videoId) {
                    return (
                      <div key="youtube-video-1" className="relative aspect-video overflow-hidden rounded-2xl">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          title={firstYoutubeImage.alt}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors"
                          title="Close video"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }
                  
                  return (
                    <button
                      key="youtube-thumbnail-1"
                      onClick={() => setPlayingVideo(videoId)}
                      className="block relative aspect-video overflow-hidden rounded-2xl group"
                    >
                      <img
                        src={firstYoutubeImage.src}
                        alt={firstYoutubeImage.alt}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7"/>
                          <polygon points="26,20 48,32 26,44" fill="#e53e3e"/>
                        </svg>
                      </span>
                    </button>
                  );
                }
                return null;
              })()}
              
              {/* Long banner images - full width, one per row */}
              <div className="space-y-4">
                {projectData.images.filter(img => img.src.includes('/amedeo/long banner-')).map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={400}
                      className="w-full h-auto object-contain transition-transform"
                    />
                  </div>
                ))}
              </div>
              
              {/* Second YouTube video - full width */}
              {(() => {
                const secondYoutubeImage = projectData.images.find(img => img.src.includes('img.youtube.com/vi/ONLPHzzviAY'));
                if (secondYoutubeImage) {
                  const match = secondYoutubeImage.src.match(/img.youtube.com\/vi\/([^/]+)\//);
                  const videoId = match ? match[1] : null;
                  
                  if (playingVideo === videoId) {
                    return (
                      <div key="youtube-video-2" className="relative aspect-video overflow-hidden rounded-2xl">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          title={secondYoutubeImage.alt}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors"
                          title="Close video"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }
                  
                  return (
                    <button
                      key="youtube-thumbnail-2"
                      onClick={() => setPlayingVideo(videoId)}
                      className="block relative aspect-video overflow-hidden rounded-2xl group"
                    >
                      <img
                        src={secondYoutubeImage.src}
                        alt={secondYoutubeImage.alt}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7"/>
                          <polygon points="26,20 48,32 26,44" fill="#e53e3e"/>
                        </svg>
                      </span>
                    </button>
                  );
                }
                return null;
              })()}
              
              {/* Bag image - full width */}
              <div className="relative w-full overflow-hidden rounded-2xl">
                {(() => {
                  const bagImage = projectData.images.find(img => img.src.includes('/amedeo/bag image.jpg'));
                  if (bagImage) {
                    return (
                      <Image
                        src={bagImage.src}
                        alt={bagImage.alt}
                        width={1200}
                        height={400}
                        className="w-full h-auto object-contain transition-transform"
                      />
                    );
                  }
                  return null;
                })()}
              </div>
              
              {/* Product images - 3-column grid */}
              <div className="grid grid-cols-3 gap-4">
                {projectData.images.filter(img => img.src.includes('/amedeo/product-')).map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain transition-transform"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Default layout for other projects */
            <div className="grid grid-cols-1 gap-4">
              {projectData.images.map((image, index) => {
                // For Titans, Richest, Royal, Health, Psychology, Viral 3D, Wildlife, Sports, Book Cover Hub, and T-Shirt Brand projects, make YouTube thumbnails clickable
                if (
                  (projectData.title === 'Titans' || projectData.title === 'Richest' || projectData.title === 'Royal' || projectData.title === 'Health' || projectData.title === 'Psychology' || projectData.title === 'Viral 3D' || projectData.title === 'Wildlife' || projectData.title === 'Sports' || projectData.title === 'Book Cover Hub' || projectData.title === 'T-Shirt Brand') &&
                  image.src.includes('img.youtube.com/vi/')
                ) {
                  // Extract video ID from the thumbnail URL
                  const match = image.src.match(/img.youtube.com\/vi\/([^/]+)\//);
                  const videoId = match ? match[1] : null;
                  
                  // Check if this video is currently playing
                  const isPlaying = playingVideo === videoId;
                  
                  if (isPlaying && videoId) {
                    // Show embedded YouTube player
                    return (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-2xl">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          title={image.alt}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors"
                          title="Close video"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }
                  
                  // Show clickable thumbnail
                  return (
                    <button
                      key={index}
                      onClick={() => setPlayingVideo(videoId)}
                      className="block relative aspect-video overflow-hidden rounded-2xl group"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7"/>
                          <polygon points="26,20 48,32 26,44" fill="#e53e3e"/>
                        </svg>
                      </span>
                    </button>
                  );
                }
                // Default image rendering for other projects
                return (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// All projects data
const allProjects = [
  {
    category: 'Youtube Videos',
    title: 'Titans',
    src: '/company-titans.png',
    content: <ProjectContent project={{ title: 'Titans' }} />,
  },
  {
    category: 'Youtube Videos',
    title: 'Richest',
    src: '/the richest.png',
    content: <ProjectContent project={{ title: 'Richest' }} />,
  },
  {
    category: 'Youtube Videos',
    title: 'Royal',
    src: '/the-royal.png',
    content: <ProjectContent project={{ title: 'Royal' }} />,
  },
  {
    category: 'Youtube Videos',
    title: 'Health',
    src: '/the-health.png',
    content: <ProjectContent project={{ title: 'Health' }} />,
  },
  {
    category: 'Youtube Videos',
    title: 'Psychology',
    src: '/self made mind.png',
    content: <ProjectContent project={{ title: 'Psychology' }} />,
  },
  {
    category: 'Reels/Shorts',
    title: 'Viral 3D',
    src: '/viral3d.png',
    content: <ProjectContent project={{ title: 'Viral 3D' }} />,
  },
  {
    category: 'Reels/Shorts',
    title: 'Wildlife',
    src: '/wildlife.png',
    content: <ProjectContent project={{ title: 'Wildlife' }} />,
  },
  {
    category: 'Reels/Shorts',
    title: 'Sports',
    src: '/sports.png',
    content: <ProjectContent project={{ title: 'Sports' }} />,
  },
  {
    category: 'Reels/Shorts',
    title: 'Book Cover Hub',
    src: '/book cover.png',
    content: <ProjectContent project={{ title: 'Book Cover Hub' }} />,
  },
  {
    category: 'Ecommerce',
    title: 'T-Shirt Brand',
    src: '/tshirts.png',
    content: <ProjectContent project={PROJECT_CONTENT.find(p => p.title === 'T-Shirt Brand')!} />,
  },
  {
    category: 'Ecommerce',
    title: 'Farmers4u',
    src: '/fruits.jpg',
    content: <ProjectContent project={PROJECT_CONTENT.find(p => p.title === 'Farmers4u')!} />,
  },
  {
    category: 'Ecommerce',
    title: 'Amedeo Exclusive',
    src: '/amedeo.jpg',
    content: <ProjectContent project={PROJECT_CONTENT.find(p => p.title === 'Amedeo Exclusive')!} />,
  },
];

// Keep first 2 projects (Titans and Richest) in their positions, shuffle the rest
const firstTwo = allProjects.slice(0, 2);
const remainingProjects = shuffleArray(allProjects.slice(2));

// Main data export with randomized order (keeping first 2 fixed)
export const data = [...firstTwo, ...remainingProjects];
