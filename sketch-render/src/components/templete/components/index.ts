import { Countdown } from './custom/countdown';
import { SliderNumber } from './custom/slider-number';
import { Text } from './basic/text';
import { Box } from './basic/block';
import { Bitmap } from './basic/bitmap';
import { Swiper } from './custom/swiper';
import { Turntable } from './custom/turntable';
import { Scratchcard } from './custom/scratchcard';
import { CrateNodeAction } from '@/modal/useArticle';
import { NodeType, CustomComponentType } from '../constants';
import { Dialog } from './custom/dialog';

export const componentMap = {
  Countdown,
  Dialog,
  SliderNumber,
  Swiper,
  Text,
  Bitmap,
  Box,
  Turntable,
  Scratchcard
};

export type CreateElementAction =
	| CrateNodeAction<NodeType.TEXT>
	| CrateNodeAction<NodeType.BLOCK>
	| CrateNodeAction<NodeType.BITMAP, string>
	| CrateNodeAction<CustomComponentType.Countdown, number>
	| CrateNodeAction<CustomComponentType.SliderNumber, string>
	| CrateNodeAction<CustomComponentType.Turntable, string>
	| CrateNodeAction<CustomComponentType.Scratchcard, string>
