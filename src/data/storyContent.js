/**
 * ============================================================
 *  CUSTOMIZE YOUR STORY PAGES HERE
 * ============================================================
 *
 *  Each object = one story page. Update the title & text below.
 *  To add/remove pages, just add/remove objects from the array.
 *  The last page is always followed by the proposal page.
 * ============================================================
 */

import img1 from '../assets/images/KB1.jpeg';
import img2 from '../assets/images/KB12.jpeg';
import img3 from '../assets/images/KB3.jpeg';
import img4 from '../assets/images/KB4.jpeg';
import img5 from '../assets/images/KB5.jpeg';
import img6 from '../assets/images/KB6.jpeg';
import img7 from '../assets/images/KB7.jpeg';
import img9 from '../assets/images/KB8.jpeg';
import img10 from '../assets/images/KB9.jpeg';
import img11 from '../assets/images/KB10.jpeg'
import img12 from '../assets/images/KB13.jpeg'

// Songs
import songTaneJoy from '../assets/songs/tane_joy_me_jyaarthi.mp3';
import songKaunTujhe from '../assets/songs/kaun_tujhe.mp3';
import songEkDin from '../assets/songs/ek_din_aap.mp3';
import songTumSeHi from '../assets/songs/tum_se_hi.mp3';
import songVhalam from '../assets/songs/vhalam_aavo_ne.mp3';

const storyPages = [
    {
    title: 'You, My Forever Surprise',
    text: `You have always done everything perfectly for me. I know that every surprise you gave me was just perfect. I don't think I can ever do things as perfectly as you do. You keep adding more and more beautiful memories to my life… and still, I keep doing kach kach and tak tak`,
    image: img2,
    song: songTaneJoy,
  },
    {
    title: 'Hold Me… Even If I Bite',
    text: 'need your shoulder every time and everywhere, because I feel like a little child who just wants to cry… and of course, I might bite you too 😂"',
    image: img5,
    song: songTaneJoy,
  },
  {
    title: 'My Favorite Prayer',
    text: `"Going to the temple with you and sitting there quietly gives me the kind of peace I've always wished for in my life. You may not realize it, but I truly love watching you while you pray in front of God. There's something so pure and beautiful about that moment."`,
    image: img1,
    song: songKaunTujhe,
  },
  {
    title: 'Tere Saath Kahin Bhi',
    text: 'Tune bola tha kedarnath sath chaloge....ha tu hai to kahi bhi ja sakti hu ❤️❤️',
    image: img4,
    song: songKaunTujhe,
  },
    {
    title: 'Tu thodi der aur thehar ja....',
    text: 'Juice date is like cutest one....bcoz when u say " jata jata juice pita jaie" Im like thodi var vadhare sathe raie...I always need more of you',
    image: img3,
    song: songEkDin,
  },
  {
    title: 'Soul Comfort',
    text: '"These 1.5 months in Ahmedabad have been full of mixed emotions, but being with you and around you has made me happier than anything."',
    image: img6,
    tall: true,
    song: songEkDin,
  },
      {
    title: 'Effortless Love',
    text: 'Outside McDonald’s, when we were eating pani puri and ‘Aaye Ho Meri Zindagi Mein Tum’ was playing in the background, it felt like a dream moment I had always wished for… and it just happened so effortlessly',
    image: img11,
    tall: true,
    song: songEkDin,
  },
  {
    title: 'In your arms, I forget every worry I carry.',
    text: `When you hug me like this, all my stress just disappears. It feels like I can finally relax and be myself without any worries. In that moment, nothing else matters except feeling safe and calm with you. No matter what's going on around us, as long as I'm with you, I know everything will be alright.`,
    image: img7,
    tall: true,
    song: songTumSeHi,
  },
    {
    title: 'Never Letting Go',
    text: `It hurts me when we fight, and after every fight, I just want your attention and reassurance. But if you think about it, the reason we fight is because we both care deeply about each other and don’t want to lose one another`,
    image: img12,
    tall: true,
    song: songTumSeHi,
  },
  {
    title: 'Always You',
    text: 'You are that part of my life I never want to forget. Love you always and forever. Every memory we’ve made together is a treasure I’ll carry in my heart forever. I promise to stand by you, love you, and create a lifetime of happiness together',
    image: img10,
    tall: true,
    song: songTumSeHi,
  },
  {
    title: 'You have to stay close to me that all i need',
    text: 'Will you stay with me for this life ?',
    image: img9,
    song: songTumSeHi,
  },
];

export default storyPages;
