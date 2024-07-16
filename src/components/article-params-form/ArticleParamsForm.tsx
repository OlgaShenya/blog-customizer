import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { useFormClose } from '../hooks/useFormClose';

type TArticleParamsProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsProps) => {
	const { open, setOpen, formContainerRef } = useFormClose();

	const [params, setParams] = useState<ArticleStateType>(articleState);

	const toggleOpen = () => {
		setOpen(!open);
	};

	const submitForm = (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(params);
		toggleOpen();
	};

	const resetParams = () => {
		setArticleState(defaultArticleState);
		setParams(defaultArticleState);
	};

	return (
		<div ref={formContainerRef}>
			<ArrowButton onClick={toggleOpen} open={open} />
			<aside className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as={'h1'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setParams((current) => ({
								...current,
								fontFamilyOption: selected,
							}))
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={params.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setParams((current) => ({
								...current,
								fontSizeOption: selected,
							}))
						}
					/>
					<Select
						title='цвет шрифта'
						selected={params.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setParams((current) => ({
								...current,
								fontColor: selected,
							}))
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setParams((current) => ({
								...current,
								backgroundColor: selected,
							}))
						}
					/>
					<Select
						title='ширина контента'
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setParams((current) => ({
								...current,
								contentWidth: selected,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetParams} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
