import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './ui/arrow-button';
import { FontFamiliesClasses } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const toggleForm = () => setIsFormOpen((prev) => !prev);

	const handleApplyParams = (params: {
		fontFamily: FontFamiliesClasses;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidthArr: string;
	}) => {
		setArticleParams({
			fontFamilyOption: {
				...defaultArticleState.fontFamilyOption,
				value: params.fontFamily,
			},
			fontSizeOption: {
				...defaultArticleState.fontSizeOption,
				value: params.fontSize,
			},
			fontColor: { ...defaultArticleState.fontColor, value: params.fontColor },
			backgroundColor: {
				...defaultArticleState.backgroundColor,
				value: params.backgroundColor,
			},
			contentWidth: {
				...defaultArticleState.contentWidth,
				value: params.contentWidthArr,
			},
		});
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<ArticleParamsForm onApply={handleApplyParams} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
