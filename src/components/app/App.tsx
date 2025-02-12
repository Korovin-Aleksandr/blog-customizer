import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import { ArticleStateType } from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyParams = (params: ArticleStateType) => {
		setArticleParams(params);
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
			<ArticleParamsForm onApply={handleApplyParams} />
			<Article />
		</main>
	);
};
