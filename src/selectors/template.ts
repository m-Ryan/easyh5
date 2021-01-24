import { useAppSelector } from '@/hooks/useAppSelector';
import { AppState } from '@/store';
import { createSelector } from 'reselect';

export const getTemplate = (state: AppState) => state.template;

export const parseTemplate = createSelector(
  getTemplate,
  (template) => {
    if (!template) return null;
    const content = JSON.parse(template.content.content);
    return {
      ...template,
      content,
      focusIdx: '0'
    };
  }
);