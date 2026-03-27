export interface TempleData {
  id: string;
  name: string;
  deity: string;
  heroImage: string;
  logo: string;
  subtitle: string;
  about: string;
  address: string;
  phone: string;
  hours: string;
  theme: {
    primary: string;
    accent: string;
  };
}

export const temples: Record<string, TempleData> = {
  default: {
    id: 'default',
    name: '大甲鎮瀾宮',
    deity: '天上聖母媽祖',
    heroImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d71c?q=80&w=1000&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=200&auto=format&fit=crop',
    subtitle: '護佑眾生，庇佑平安',
    about: '供奉天上聖母媽祖，\n庇佑平安順遂，\n香火綿延至今。',
    address: '台中市大甲區順天路158號',
    phone: '04-2687-2001',
    hours: '06:00 - 21:30',
    theme: {
      primary: 'dark-red',
      accent: 'gold',
    }
  },
  yue_lao: {
    id: 'yue_lao',
    name: '台北霞海城隍廟',
    deity: '月下老人',
    heroImage: 'https://images.unsplash.com/photo-1542054783-8b85b4b2f110?q=80&w=1000&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=200&auto=format&fit=crop',
    subtitle: '千里姻緣一線牽',
    about: '供奉月下老人，\n祈求良緣早結，\n百年好合。',
    address: '台北市大同區迪化街一段61號',
    phone: '02-2558-0346',
    hours: '06:16 - 19:47',
    theme: {
      primary: 'dark-red',
      accent: 'gold',
    }
  }
};
