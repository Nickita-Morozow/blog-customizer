import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const panelRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (!panelRef.current?.contains(target) && !arrowRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeOption = (key: keyof ArticleStateType, option: OptionType): void => {
    setFormState((current) => ({
      ...current,
      [key]: option,
    }));
  };

  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={arrowRef}>
        <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />
      </div>

      <aside
        ref={panelRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => changeOption('fontFamilyOption', option)}
          />

          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) => changeOption('fontSizeOption', option)}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => changeOption('fontColor', option)}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => changeOption('backgroundColor', option)}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => changeOption('contentWidth', option)}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
