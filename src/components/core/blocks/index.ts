
import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

import { Text } from './basic/Text';
import { Box } from './basic/Box';
import { Image } from './basic/Image';
import { Page } from './basic/Page';
import { Dialog } from './basic/Dialog';
import { Audio } from './basic/Audio';
import { Video } from './basic/Video';

import { Form } from './form/Form';
import { Input } from './form/Input';
import { Switch } from './form/Switch';
import { Checkbox } from './form/Checkbox';
import { Radio } from './form/Radio';
import { SubmitButton } from './form/SubmitButton';

import { Countdown } from './marketing/Countdown';

export const BlocksMap = {
  Text,
  Image,
  Box,
  Page,
  Dialog,
  Audio,
  Video,

  Form,
  Input,
  Switch,
  Checkbox,
  Radio,
  SubmitButton,

  Countdown

};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find(item => item.type === type)!;
}