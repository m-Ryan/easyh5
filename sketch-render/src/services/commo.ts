import { request } from './axios.config';
import { getCookie } from '../util/utils';
const QI_NIUI_KEY = 'qiniuConfig';

type QiniuConfig = { origin: string; token: string };

export const common = {
	async uploadByQiniu(file: File | Blob): Promise<string> {
		const qiniuCookie = getCookie(QI_NIUI_KEY); // 有cookie先拿cookie
    let qiniuConfig: QiniuConfig;
		if (qiniuCookie) {
			qiniuConfig = JSON.parse(qiniuCookie);
    } else {
			qiniuConfig = await request.get<QiniuConfig>('http://www.maocanhua.cn/api/upload/visitor/qiniu-token');
			document.cookie = `${QI_NIUI_KEY}=${JSON.stringify(qiniuConfig)}; max-age=540;`; //设置十分钟有效期
    }
		const { token, origin } = qiniuConfig;
		const data = new FormData();
		data.append('file', file);
		data.append('token', token);
    const res = await request.post<{ key: string  }>('http://upload.qiniu.com', data);
		return origin + '/' + res.key;
	}
};
