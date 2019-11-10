import qiniu from 'qiniu';
import fs from 'fs-extra';
function getQiniu(name?: string) {
	const accessKey = '2WAZdi48g5fLK3645nwy8FEb5_XaqYooOhh35AuG';
	const secretKey = 'XIKjs-HKSEiOusWztCRQ565KvDAcQRxHtY5ZO_xh';
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	const options = {
		scope: 'mryan'
	};
	if (name) {
		options.scope = 'mryan:' + name;
	}
	const putPolicy = new qiniu.rs.PutPolicy(options);
	const uploadToken = putPolicy.uploadToken(mac);
	return {
		token: uploadToken,
		origin: 'http://assets.maocanhua.cn',
		options
	};
}

export async function uploadQiuNiuFile(filePath: string) {
	const { token, origin, options } = getQiniu();
	// 创建可读流
	const readerStream = fs.createReadStream(filePath);
	const formUploader = new qiniu.form_up.FormUploader(options);
	const putExtra = new qiniu.form_up.PutExtra();
	return new Promise((resolve, reject) => {
		formUploader.putStream(
			token,
			null,
			readerStream,
			putExtra,
			(respErr, respBody: { key: string; hash: string }, respInfo) => {
				if (respErr) {
					return reject(respErr);
				}
				if (respInfo.statusCode === 200) {
					return resolve(origin + '/' + respBody.key);
				}
				return reject(new Error('上传失败'));
			}
		);
	}) as Promise<string>;
}
