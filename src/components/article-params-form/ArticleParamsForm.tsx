import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType } from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: (typeof defaultArticleState)[typeof field]) => {
			setArticleState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(articleState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text
						dynamic={false}
						as='h2'
						size={31}
						weight={800}
						uppercase
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						title='ШРИФТ'
						onChange={handleOnChange('fontFamilyOption')}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
					/>

					<RadioGroup
						name='РАЗМЕР ШРИФТА'
						title='РАЗМЕР ШРИФТА'
						onChange={handleOnChange('fontSizeOption')}
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
					/>

					<Select
						title='ЦВЕТ ШРИФТА'
						onChange={handleOnChange('fontColor')}
						selected={articleState.fontColor}
						options={fontColors}
					/>

					<Select
						title='ЦВЕТ ФОНА'
						onChange={handleOnChange('backgroundColor')}
						selected={articleState.backgroundColor}
						options={backgroundColors}
					/>

					<Select
						title='ШИРИНА КОНТЕНТА'
						onChange={handleOnChange('contentWidth')}
						selected={articleState.contentWidth}
						options={contentWidthArr}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
