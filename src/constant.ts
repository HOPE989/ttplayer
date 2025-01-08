import jinitaimei from './assets/jinitaimei.mp3';
import default1 from './assets/40mP (40㍍P) _ 初音未来 (初音ミク) - 恋愛裁判.ogg'
import default2 from './assets/Maroon 5 - Feelings.ogg';
import default3 from './assets/ヨルシカ (Yorushika) - 夜行.ogg';
import default4 from './assets/陈绮贞 - 旅行的意义 (TRAVEL IS MEANINGFUL) (Single Version).ogg'

export interface PlayListItem {
    name: string;
    url: string;
}

export const defaultPlayList: PlayListItem[] = [
    {
        name: '只因你太美',
        url: jinitaimei,
    },
    {
        name: '40mP (40㍍P) _ 初音未来 (初音ミク) - 恋愛裁判',
        url: default1,
    },
    {
        name: 'Maroon 5 - Feelings',
        url: default2,
    },
    {
        name: 'ヨルシカ (Yorushika) - 夜行',
        url: default3,
    },
    {
        name: '陈绮贞 - 旅行的意义 (TRAVEL IS MEANINGFUL) (Single Version)',
        url: default4,
    },
]
