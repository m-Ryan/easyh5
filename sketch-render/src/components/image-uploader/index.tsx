import React, { useState } from 'react';
import styles from './index.module.scss';
import { Icon, Modal, message } from 'antd';
import { Uploader } from '@/util/uploader';
import services from '../../services/index';

interface ImageUploaderProps {
	url: string;
	onRemove: () => void;
	onSuccess: (url: string)=>void;
}

export function ImageUploader({ url, onRemove, onSuccess }: ImageUploaderProps) {
	const [preview, setPreview] = useState(false);

	const onUpload = ()=> {
		const uploader = new Uploader(
			services.common.uploadByQiniu,
			{
				accept: 'image'
			}
		)
		
		uploader.on('success', (urls)=> {
			onSuccess(urls[0]);
		})
		
		uploader.on('error', ()=> {
			message.error('上传失败');
		})

		uploader.chooseFile();

	}

	if (!url) {
		return (
			<div className={styles['upload']} onClick={onUpload}>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		)
	}

	return (
		<div className={styles['container']}>
			<div className={styles['info']}>
				<img src={url} alt="标题图：" />
				<div className={styles['btn-wrap']}>
					<a title="预览" onClick={() => setPreview(true)}>
						<Icon type="eye" />
					</a>
					<a title="移除" onClick={onRemove}>
						<Icon type="delete" />
					</a>
				</div>
			</div>
			<Modal visible={preview} footer={null} onCancel={()=>setPreview(false)}>
				<img alt="预览图" style={{ width: '100%' }} src={url} />
			</Modal>
		</div>
	);
}
