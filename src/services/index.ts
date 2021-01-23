import './axios.config';
import { common } from '@/services/common';
import { article } from './article';
import { user } from './user';
import { promotion } from './promotion';

const services = {
  common,
  article,
  user,
  promotion
};

export default services;
