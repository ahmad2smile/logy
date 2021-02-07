const LINK_REGEX = RegExp(/(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/, 'g');

class RegExpReplaced extends RegExp {
    [Symbol.replace](str,replacer) {
        return RegExp.prototype[Symbol.replace].call(this, str, replacer);
    }
}

const setStyles = (element, styles)=> {
    Object.entries(styles).forEach(([key, value])=> {
        element.style[key] = value;
    })
}

const insertTagInContent = (tag)=> {
    return `"</code>${tag}<code>"`;
}

const activateLink = (content) => {
    let result;
    const repalced = {};
    let activatedContent = ''

    while ((result = RegExp(LINK_REGEX).exec(content)) !== null) {
		const link = result[0];

		if (repalced[link]) {
			continue;
		}

		activatedContent = content.replaceAll(link, insertTagInContent(`<a href="${link}" target="_blank">${link}</a>`));

		repalced[link] = true;
	}

    return activatedContent || content;
}

const airflowStyles = {
    backgroundColor: '#1A2B34',
    color: '#fff',
};


const getAirflowElements = () => {
    const elements = document.querySelectorAll("pre > code");

    if (!elements.length) {
        throw new Error('Airflow logs not found');
    }

    return elements;
}

const linkifyAirflow = () => {
    const elements = getAirflowElements();

    elements.forEach(element => {
        const parentElement = element.parentElement;
        setStyles(parentElement, airflowStyles);
        
		const content = element.innerText;
        
		const linkifyContent = activateLink(content);

        const codeElement = document.createElement('code')
        Object.values({ ...element.attributes }).forEach((a) => codeElement.setAttribute(a.name, a.value));
        codeElement.innerHTML = linkifyContent;

		parentElement.innerHTML = '';
		parentElement.append(codeElement)
    });
}    

const linkify = () => {
    linkifyAirflow();
}    

linkify();
