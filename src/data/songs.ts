export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  lyricsUrl: string;
  type: 'public' | 'original';
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Lofi Coding Dream",
    artist: "LiuMozz SoundLab",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&auto=format&fit=crop&q=80",
    lyricsUrl: "/music/lyrics/lofi-coding-dream.lrc",
    type: "original"
  },
  {
    id: "2",
    title: "Cyberpunk Midnight Pulse",
    artist: "Neon Matrix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80",
    lyricsUrl: "/music/lyrics/cyberpunk-midnight-pulse.lrc",
    type: "original"
  },
  {
    id: "3",
    title: "私奔到月球",
    artist: "五月天 & 陈绮贞",
    url: "/music/五月天&陈绮贞-私奔到月球.mp3",
    cover: "https://p1.music.126.net/W-51_KarHCksGktUAnk0Cg==/109951168160514616.jpg",
    lyricsUrl: "/music/lyrics/sibendouyueqiu.lrc",
    type: "public"
  },
  {
    id: "4",
    title: "一千个世纪",
    artist: "五月天",
    url: "/music/五月天-一千个世纪.mp3",
    cover: "https://p1.music.126.net/JB1KSCawP8fE9ClAEP_31w==/109951168160434557.jpg",
    lyricsUrl: "/music/lyrics/yiqanggeshiji.lrc",
    type: "public"
  },
  {
    id: "5",
    title: "为你写下这首情歌",
    artist: "五月天",
    url: "/music/五月天-为你写下这首情歌.mp3",
    cover: "https://p2.music.126.net/oy433NJOoMdCpWRdYOLqNA==/109951168181355474.jpg",
    lyricsUrl: "/music/lyrics/weiniziexiazheshouqingge.lrc",
    type: "public"
  },
  {
    id: "6",
    title: "后青春期的诗",
    artist: "五月天",
    url: "/music/五月天-后青春期的诗.mp3",
    cover: "https://p2.music.126.net/l0vGEnowGfj6DgFSGojyfQ==/109951168163397768.jpg",
    lyricsUrl: "/music/lyrics/houqingchunqideshi.lrc",
    type: "public"
  },
  {
    id: "7",
    title: "因为你 所以我",
    artist: "五月天",
    url: "/music/五月天-因为你 所以我.mp3",
    cover: "https://p2.music.126.net/Jvt8qxXo5FoGd13218Lv2Q==/109951168163428009.jpg",
    lyricsUrl: "/music/lyrics/yinweiqisuoyiwo.lrc",
    type: "public"
  },
  {
    id: "8",
    title: "天使",
    artist: "五月天",
    url: "/music/五月天-天使.mp3",
    cover: "https://p2.music.126.net/JB1KSCawP8fE9ClAEP_31w==/109951168160434557.jpg",
    lyricsUrl: "/music/lyrics/tianshi.lrc",
    type: "public"
  },
  {
    id: "9",
    title: "如果我们不曾相遇",
    artist: "五月天",
    url: "/music/五月天-如果我们不曾相遇.mp3",
    cover: "https://p1.music.126.net/lt4R_XbCZsT-yzRfWs9VfQ==/3434874331529456.jpg",
    lyricsUrl: "/music/lyrics/ruguowomenbucengxiangyu.lrc",
    type: "public"
  },
  {
    id: "10",
    title: "干杯",
    artist: "五月天",
    url: "/music/五月天-干杯.mp3",
    cover: "https://p2.music.126.net/5Bu3XLAvh-M9Iwkh0wlOYg==/109951168162347102.jpg",
    lyricsUrl: "/music/lyrics/ganbei.lrc",
    type: "public"
  },
  {
    id: "11",
    title: "恋爱ing",
    artist: "五月天",
    url: "/music/五月天-恋爱ing.mp3",
    cover: "https://p1.music.126.net/pLn35sx61-IXRYfCbfPnCA==/109951171415600711.jpg",
    lyricsUrl: "/music/lyrics/lianaiing.lrc",
    type: "public"
  },
  {
    id: "12",
    title: "我又初恋了",
    artist: "五月天",
    url: "/music/五月天-我又初恋了.mp3",
    cover: "https://p2.music.126.net/JB1KSCawP8fE9ClAEP_31w==/109951168160434557.jpg",
    lyricsUrl: "/music/lyrics/woyouchulianle.lrc",
    type: "public"
  },
  {
    id: "13",
    title: "最好的一天",
    artist: "五月天",
    url: "/music/五月天-最好的一天.mp3",
    cover: "https://p1.music.126.net/lt4R_XbCZsT-yzRfWs9VfQ==/3434874331529456.jpg",
    lyricsUrl: "/music/lyrics/zuihaodeyitian.lrc",
    type: "public"
  },
  {
    id: "14",
    title: "最重要的小事",
    artist: "五月天",
    url: "/music/五月天-最重要的小事.mp3",
    cover: "https://p2.music.126.net/JB1KSCawP8fE9ClAEP_31w==/109951168160434557.jpg",
    lyricsUrl: "/music/lyrics/zuizhongyaodexiaoshi.lrc",
    type: "public"
  },
  {
    id: "15",
    title: "知足",
    artist: "五月天",
    url: "/music/五月天-知足.mp3",
    cover: "https://p2.music.126.net/pLn35sx61-IXRYfCbfPnCA==/109951171415600711.jpg",
    lyricsUrl: "/music/lyrics/zhizu.lrc",
    type: "public"
  },
  {
    id: "16",
    title: "让我照顾你",
    artist: "五月天",
    url: "/music/五月天-让我照顾你.mp3",
    cover: "https://p2.music.126.net/6BGLm69kJGI_NPaezIPihA==/109951172136049624.jpg",
    lyricsUrl: "/music/lyrics/rangwozhaoguni.lrc",
    type: "public"
  },
  {
    id: "17",
    title: "像晴天像雨天",
    artist: "汪苏泷",
    url: "/music/汪苏泷-像晴天像雨天.mp3",
    cover: "https://p2.music.126.net/gN6htv5E9WwyOoTASMuvDQ==/109951170483576228.jpg",
    lyricsUrl: "/music/lyrics/xiangqingtianxiangyutian.lrc",
    type: "public"
  }
];
