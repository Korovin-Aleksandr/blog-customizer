import { useState } from 'react';
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
import { FontFamiliesClasses } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParams = {
	fontFamily: FontFamiliesClasses;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidthArr: string;
};

type ArticleParamsFormProps = {
	onApply: (params: ArticleParams) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontSelectedColors, setSelectedColors] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundSelectedColor, setBackgtoundSelectedColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentSelectedCWidthArr, setContentSelectedCWidthArr] = useState(
		defaultArticleState.contentWidth
	);

	const toggleState = () => {
		setOpen((prev) => !prev);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamily: selectedFont.className as FontFamiliesClasses,
			fontSize: fontSize.value,
			fontColor: fontSelectedColors.value,
			backgroundColor: backgroundSelectedColor.value,
			contentWidthArr: contentSelectedCWidthArr.value,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
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
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={setSelectedFont}
					/>

					<RadioGroup
						name='РАЗМЕР ШРИФТА'
						selected={fontSize}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
						onChange={setFontSize}
					/>

					<Select
						title='ЦВЕТ ШРИФТА'
						selected={fontSelectedColors}
						options={fontColors}
						onChange={setSelectedColors}
					/>

					<Select
						title='ЦВЕТ ФОНА'
						selected={backgroundSelectedColor}
						options={backgroundColors}
						onChange={setBackgtoundSelectedColor}
					/>

					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={contentSelectedCWidthArr}
						options={contentWidthArr}
						onChange={setContentSelectedCWidthArr}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFont(defaultArticleState.fontFamilyOption);
								setFontSize(defaultArticleState.fontSizeOption);
								setSelectedColors(defaultArticleState.fontColor);
								setBackgtoundSelectedColor(defaultArticleState.backgroundColor);
								setContentSelectedCWidthArr(defaultArticleState.contentWidth);

								onApply({
									fontFamily: defaultArticleState.fontFamilyOption
										.className as FontFamiliesClasses,
									fontSize: defaultArticleState.fontSizeOption.value,
									fontColor: defaultArticleState.fontColor.value,
									backgroundColor: defaultArticleState.backgroundColor.value,
									contentWidthArr: defaultArticleState.contentWidth.value,
								});
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
