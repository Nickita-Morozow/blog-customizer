import { clsx } from 'clsx';
import { useCallback, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { useSidebarClose } from 'src/hooks/useSidebarClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const panelRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((): void => {
    setIsSidebarOpen(false);
  }, []);

  useSidebarClose({
    panelRef,
    arrowRef,
    isOpen: isSidebarOpen,
    onClose: handleClose,
  });

  const createOptionChangeHandler =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((current) => ({
        ...current,
        [key]: option,
      }));
    };

  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={arrowRef}>
        <ArrowButton
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen((open) => !open)}
        />
      </div>

      <aside
        ref={panelRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as="h2" size={31} weight={800}>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={createOptionChangeHandler('fontFamilyOption')}
          />

          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={createOptionChangeHandler('fontSizeOption')}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={createOptionChangeHandler('fontColor')}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={createOptionChangeHandler('backgroundColor')}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={createOptionChangeHandler('contentWidth')}
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
