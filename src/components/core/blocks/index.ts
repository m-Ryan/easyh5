
import { Text } from './basic/Text';
import { Box } from './basic/Box';
import { Image } from './basic/Image';
import { Section } from './basic/Section';
import { Page } from './basic/Page';
import { Dialog } from './basic/Dialog';
import { Audio } from './basic/Audio';
import { Form } from './extra/Form';
import { Input } from './extra/Input';
import { Switch } from './extra/Switch';
import { Checkbox } from './extra/Checkbox';
import { Radio } from './extra/Radio';
import { SubmitButton } from './extra/SubmitButton';
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