// ── 类型定义 ────────────────────────────────────────────────────

export type Post = {
  id: number;
  slug: string;
  zhTitle: string;
  enTitle: string;
  author: string;          // 作者名（自己的名字）
  location: string;
  firstLook: string;       // 拍摄日期
  secondLook: string;      // 写作日期
  days: string;            // 时间差
  excerpt: string;
  body: string[];
  image: string;
  tag: string;             // 标签：那年今日 / 随机
};

export type DailyPhoto = {
  id: number;
  location: string;
  firstLook: string;
  badge: string;           // 那年今日 | 随机
  image: string;
};

export type SourceOption = {
  key: string;
  title: string;
  description: string;
};

// ── Mock 数据（后续替换为 Supabase 查询）────────────────────────

export const posts: Post[] = [
  {
    id: 1,
    slug: 'still-warm-after-rain',
    zhTitle: '雨后仍有余温',
    enTitle: 'Still Warm After Rain',
    author: '小尼',
    location: '北京',
    firstLook: '2019.04.12',
    secondLook: '2026.03.16',
    days: '2529',
    excerpt:
      '这不是一张重要的照片，却像一粒被时间保存下来的灰。今天再看，我才发现那天真正被拍下来的，不是街景，是当时没说出口的疲惫和柔软。',
    body: [
      '这不是一张重要的照片，却像一粒被时间保存下来的灰。今天再看，我才发现那天真正被拍下来的，不是街景，是当时没说出口的疲惫和柔软。',
      '重新写一张旧照片，不是在补一段说明，而是在承认自己已经变化。拍摄发生在过去，书写发生在现在，照片因此成了一座桥：一边是当时的情绪，一边是今天的理解。',
      'Second Look 想做的不是筛选最适合发社交媒体的那张，而是把那些被埋在相册里、差点被忘记、却仍然有私人重量的照片重新带回眼前。',
    ],
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    tag: '那年今日',
  },
  {
    id: 2,
    slug: 'second-light-on-the-river',
    zhTitle: '河面上的第二束光',
    enTitle: 'Second Light on the River',
    author: 'Mika',
    location: '东京',
    firstLook: '2023.06.12',
    secondLook: '2026.03.10',
    days: '1002',
    excerpt:
      '拍的时候只是觉得好看，重新写的时候才意识到，那天我其实是在努力记住一个即将结束的阶段。',
    body: [
      '拍的时候只是觉得好看，重新写的时候才意识到，那天我其实是在努力记住一个即将结束的阶段。',
      '很多照片在第一次被拍下的时候并没有语言，它们只是留在相册深处，安静地等待某一次重新翻看。',
      '当一张照片被再次书写，它就获得了第二次生命。',
    ],
    image:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=80',
    tag: '随机',
  },
  {
    id: 3,
    slug: 'a-pause-in-summer-transit',
    zhTitle: '夏天中途的一次停顿',
    enTitle: 'A Pause in Summer Transit',
    author: 'Kiki',
    location: '曼谷',
    firstLook: '2018.08.21',
    secondLook: '2026.02.28',
    days: '2748',
    excerpt:
      '我喜欢它的原因一直在变：先是颜色，后来是气味，再后来是我终于承认，那几年我一直在流动，没有真正停下。',
    body: [
      '我喜欢它的原因一直在变：先是颜色，后来是气味，再后来是我终于承认，那几年我一直在流动，没有真正停下。',
      '所以被再次选中的照片，往往不是最好看的，而是最值得重新理解的。',
    ],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
    tag: '那年今日',
  },
];

export const dailyPhotos: DailyPhoto[] = [
  {
    id: 1,
    location: '北京',
    firstLook: '2019.04.12',
    badge: '那年今日',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    location: '东京',
    firstLook: '2023.06.12',
    badge: '随机',
    image:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    location: '曼谷',
    firstLook: '2018.08.21',
    badge: '那年今日',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    location: '上海',
    firstLook: '2021.11.03',
    badge: '随机',
    image:
      'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    location: '京都',
    firstLook: '2022.03.28',
    badge: '随机',
    image:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    location: '成都',
    firstLook: '2020.09.15',
    badge: '随机',
    image:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
  },
];

export const sourceOptions: SourceOption[] = [
  {
    key: 'nas',
    title: 'NAS / 本地',
    description: '通过 WebDAV 连接你的 NAS 或本地照片库。',
  },
  {
    key: 'drive',
    title: 'Google Drive',
    description: '授权 Google Drive，读取你的照片文件夹。',
  },
  {
    key: 'upload',
    title: '直接上传',
    description: '从电脑手动上传照片，简单直接。',
  },
];
