import React from 'react';
import moment from 'moment';

export function formatter(text, metaData) {
	const textSplit = text.split('@formatter:type');
	let isFirst = true;
	let textHtml = [];
	let codeComponent = [];
	let header;
	for (let index = 0; index < textSplit.length; index++) {
			const split = textSplit[index];
			if (split.length === 0 && isFirst) {
					isFirst = false;
					continue;
			}
			if (isFirst) {
					codeComponent.push(<span key={index}>{split.slice(0, split.length)}</span>);
					isFirst = false;
			} else {
					const codeIndex = split.lastIndexOf('}');
					const codeTypeIndex = split.search(/\{/g);
					const codeType = split.slice(1, codeTypeIndex);
					const codePart = split.slice(1 + codeTypeIndex, codeIndex);
					const formatted = formatTag(index, codeType, codePart);
					if(codeType === 'header'){
						header = codePart;
					} else {
						codeComponent.push(formatted);
					}
					codeComponent.push(<span key={`${index}.text`}>{split.slice(codeIndex + 1)}</span>);
					textHtml.push(<span style={{ whiteSpace: "pre-wrap" }} key={`${index}.${index}`}>{codeComponent}</span>)
					codeComponent = [];
			}
	}
	const dateMoment = moment(metaData && metaData.lastModified);
	const date = dateMoment.isValid() ? dateMoment.format('YYYY-MM-DD h:mm A') : undefined;
	return (
		<ul uk-accordion="collapsible: false" className="uk-margin-small-bottom">
				<li className="uk-open">
						<h4 className="uk-margin-remove">{header}</h4>
						{date ? <div style={{textTransform:'lowercase'}}>{date}</div> : undefined}
						<div className="uk-accordion-content uk-margin-remove-top">
							{textHtml}
						</div>
				</li>
		</ul>
	);
}

function formatTag(index, codeType, codePart){
	if (codeType === 'header') {
		return <h3 style={{margin:0}} className='uk-heading-line' key={`${index}.header`}>{codePart}</h3>
	} else if(codeType === 'highlight'){
		return <span className={`${codeType}`} key={`${index}.code`}>{codePart}</span>
	} else {
			return <code style={{ whiteSpace: "pre-wrap" }} className={`language-${codeType}`} key={`${index}.code`}>{codePart}</code>
	}
}