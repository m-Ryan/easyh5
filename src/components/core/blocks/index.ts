
import { Text } from './basic/Text';
import { Box } from './basic/Box';
import { Image } from './basic/Image';
import { Section } from './basic/Section';
import { Page } from './basic/Page';
import { Dialog } from './basic/Dialog';
import { Audio } from './basic/Audio';
import { Form } from './form/Form';
import { Input } from './form/Input';
import { Switch } from './form/Switch';
import { Checkbox } from './form/Checkbox';
import { Radio } from './form/Radio';
import { SubmitButton } from './form/SubmitButton';
import { BlockType } from '@/constants';
import { IBlock } from '@/typings';

export const BlocksMap = {
  Text,
  Image,
  Box,
  Section,
  Page,
  Dialog,
  Audio,
  Form,
  Input,
  Switch,
  Checkbox,
  Radio,
  SubmitButton
};

export function getBlockByType(type: BlockType): IBlock<any> {
  return Object.values(BlocksMap).find(item => item.type === type)!;
}