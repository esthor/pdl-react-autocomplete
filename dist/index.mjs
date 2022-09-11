import "./index.css";
import $hgUW1$react, {useState as $hgUW1$useState, useRef as $hgUW1$useRef, useEffect as $hgUW1$useEffect} from "react";



function $3c4d3d85dbd3d9cc$var$Autocomplete({ field: field , size: size , onTermSelected: onTermSelected , apiKey: apiKey , placeholder: placeholder  }) {
    const [searchTerm, setSearchTerm] = $hgUW1$useState('');
    const [searchResults, setSearchResults] = $hgUW1$useState([]);
    const [focus, setFocus] = $hgUW1$useState(false);
    const [errorMessage, setErrorMessage] = $hgUW1$useState('');
    const [isLoading, setIsLoading] = $hgUW1$useState(false);
    const [isActive, setIsActive] = $hgUW1$useState(0);
    const timer = $hgUW1$useRef(null);
    const clearResults = ()=>{
        setSearchResults([]);
    };
    const fetchResults = async ()=>{
        setErrorMessage('');
        setIsActive(0);
        if (!focus) return;
        setIsLoading(true);
        if (searchTerm.length === 0) {
            const debouncedTimeout = timer.current;
            setIsLoading(false);
            if (debouncedTimeout !== null) clearTimeout(debouncedTimeout); //
            clearResults();
            return;
        }
        let reqURL = `https://api.peopledatalabs.com/v5/autocomplete?field=${field}&text=${searchTerm}`;
        if (size !== undefined) reqURL += `&size=${size}`;
        const response = await fetch(reqURL, {
            headers: {
                'X-API-Key': `${apiKey}`
            }
        });
        const data = await response.json();
        if (data.status !== 200) {
            switch(data.status){
                case 404:
                    clearResults();
                    setIsLoading(false);
                    setErrorMessage('No results');
                    break;
                case 403:
                    clearResults();
                    setIsLoading(false);
                    setErrorMessage('Unauthorized API key');
                    break;
                case 401:
                    clearResults();
                    setIsLoading(false);
                    setErrorMessage('API key required');
                    break;
                case 429:
                    clearResults();
                    setIsLoading(false);
                    setErrorMessage('API rate limit reached');
                    break;
                default:
                    clearResults();
                    setIsLoading(false);
                    setErrorMessage(data.error.message);
                    break;
            }
            return;
        }
        setSearchResults(data.data);
        setIsLoading(false);
    };
    const debounce = (cb, delay = 250)=>{
        let debouncedTimeout = timer.current;
        if (debouncedTimeout !== null) clearTimeout(debouncedTimeout);
        return ()=>{
            debouncedTimeout = setTimeout(()=>{
                cb();
            }, delay);
        };
    };
    $hgUW1$useEffect(()=>{
        if (focus) debounce(fetchResults)();
    }, [
        searchTerm,
        focus
    ]);
    const blur = ()=>{
        setFocus(false);
        const autoInput = document.querySelector('.pdl-auto-input');
        if (autoInput !== null) autoInput.blur();
    };
    const mouseDownHandler = (e)=>{
        if (searchResults.length === 0) return;
        if (e.type === 'mousedown') {
            const selected = document.querySelector('.pdl-selected');
            if (selected !== null) {
                const selectedTerm = selected.getAttribute('data-value');
                if (selectedTerm !== null) {
                    setSearchTerm(selectedTerm);
                    onTermSelected(selectedTerm);
                }
            }
        }
        blur();
    };
    const keyDownHandler = (e)=>{
        if (searchResults.length === 0) return;
        if (e.type === 'keydown') switch(e.key){
            case 'Enter':
                {
                    const selected = document.querySelector('.pdl-selected');
                    if (selected !== null) {
                        const selectedTerm = selected.getAttribute('data-value');
                        if (selectedTerm !== null) {
                            setSearchTerm(selectedTerm);
                            onTermSelected(selectedTerm);
                        }
                    }
                    blur();
                    break;
                }
            case 'ArrowDown':
                if (isActive === searchResults.length - 1 || isActive === null) setIsActive(0);
                else {
                    const toAdd = isActive;
                    setIsActive(toAdd + 1);
                }
                break;
            case 'ArrowUp':
                if (isActive === 0 || isActive === null) setIsActive(searchResults.length - 1);
                else {
                    const toSubtract = isActive;
                    setIsActive(toSubtract - 1);
                }
                break;
            case 'Escape':
                blur();
                break;
            default:
                break;
        }
    };
    const placeholderText = ()=>{
        switch(field){
            case 'company':
                return 'IE: people data labs';
            case 'country':
                return 'IE: ["united states"]';
            case 'industry':
                return 'IE: computer software';
            case 'location':
                return 'IE: berkeley, california, united states';
            case 'major':
                return 'IE: ["entrepreneurship"]';
            case 'region':
                return 'IE: ["california, united states"]';
            case 'role':
                return 'IE: operations';
            case 'sub_role':
                return 'IE: logistics';
            case 'school':
                return 'IE: university of texas at austin';
            case 'skill':
                return 'IE: data analysis';
            case 'title':
                return 'IE: co-founder and chief executive officer';
            default:
                return '';
        }
    };
    return /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: "pdl-autocomplete-wrapper"
    }, /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: `pdl-auto-input-wrapper pdl-df pdl-row ${focus ? 'pdl-input-wrapper-focus' : ''}`
    }, /*#__PURE__*/ $hgUW1$react.createElement("input", {
        className: "pdl-auto-input",
        placeholder: placeholder || placeholderText(),
        value: searchTerm,
        onChange: (e)=>setSearchTerm(e.currentTarget.value)
        ,
        onFocus: ()=>setFocus(true)
        ,
        onBlur: ()=>setFocus(false)
        ,
        onKeyDown: (e)=>keyDownHandler(e)
    }), /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: `pdl-loading-spinner ${isLoading ? '' : 'pdl-dn'}`
    })), /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: "pdl-autocomplete"
    }, /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: `pdl-suggestions ${!focus || !searchResults.length ? 'pdl-dn' : ''}`
    }, searchResults.length > 0 ? searchResults.map((searchResult, idx)=>/*#__PURE__*/ $hgUW1$react.createElement("div", {
            key: idx,
            className: `pdl-suggestion pdl-df pdl-row ${idx === isActive ? 'pdl-selected' : ''}`,
            "data-value": searchResult.name,
            "data-idx": idx,
            onMouseOver: (e)=>{
                const indexString = e.currentTarget.dataset.idx;
                if (indexString) setIsActive(parseInt(indexString, 10));
            },
            onMouseDown: (e)=>mouseDownHandler(e)
        }, /*#__PURE__*/ $hgUW1$react.createElement("div", {
            className: "pdl-suggestion-name"
        }, searchResult.name), /*#__PURE__*/ $hgUW1$react.createElement("div", {
            className: "pdl-suggestion-count"
        }, searchResult.count ? `(${searchResult.count.toLocaleString('en-US')})` : null))
    ) : null), /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: `pdl-suggestions-pending
          ${focus === false || isLoading || errorMessage || searchResults.length > 0 ? 'pdl-dn' : ''}`
    }, "Start typing to get suggestions"), /*#__PURE__*/ $hgUW1$react.createElement("div", {
        className: `pdl-suggestions-error
          ${errorMessage.length === 0 || !focus || searchTerm.length === 0 ? 'pdl-dn' : ''}`
    }, errorMessage)));
}
var $3c4d3d85dbd3d9cc$export$2e2bcd8739ae039 = $3c4d3d85dbd3d9cc$var$Autocomplete;



var $149c1bd638913645$export$2e2bcd8739ae039 = $3c4d3d85dbd3d9cc$export$2e2bcd8739ae039;


export {$149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.mjs.map
