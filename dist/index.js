require("./index.css");
var $8zHUo$react = require("react");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);


function $7894d0d778642671$var$Autocomplete({ field: field , size: size , onTermSelected: onTermSelected , apiKey: apiKey , placeholder: placeholder  }) {
    const [searchTerm, setSearchTerm] = $8zHUo$react.useState('');
    const [searchResults, setSearchResults] = $8zHUo$react.useState([]);
    const [focus, setFocus] = $8zHUo$react.useState(false);
    const [errorMessage, setErrorMessage] = $8zHUo$react.useState('');
    const [isLoading, setIsLoading] = $8zHUo$react.useState(false);
    const [isActive, setIsActive] = $8zHUo$react.useState(0);
    const timer = $8zHUo$react.useRef(null);
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
    $8zHUo$react.useEffect(()=>{
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
    return /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: "pdl-autocomplete-wrapper"
    }, /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: `pdl-auto-input-wrapper pdl-df pdl-row ${focus ? 'pdl-input-wrapper-focus' : ''}`
    }, /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("input", {
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
    }), /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: `pdl-loading-spinner ${isLoading ? '' : 'pdl-dn'}`
    })), /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: "pdl-autocomplete"
    }, /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: `pdl-suggestions ${!focus || !searchResults.length ? 'pdl-dn' : ''}`
    }, searchResults.length > 0 ? searchResults.map((searchResult, idx)=>/*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
            key: idx,
            className: `pdl-suggestion pdl-df pdl-row ${idx === isActive ? 'pdl-selected' : ''}`,
            "data-value": searchResult.name,
            "data-idx": idx,
            onMouseOver: (e)=>{
                const indexString = e.currentTarget.dataset.idx;
                if (indexString) setIsActive(parseInt(indexString, 10));
            },
            onMouseDown: (e)=>mouseDownHandler(e)
        }, /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
            className: "pdl-suggestion-name"
        }, searchResult.name), /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
            className: "pdl-suggestion-count"
        }, searchResult.count ? `(${searchResult.count.toLocaleString('en-US')})` : null))
    ) : null), /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: `pdl-suggestions-pending
          ${focus === false || isLoading || errorMessage || searchResults.length > 0 ? 'pdl-dn' : ''}`
    }, "Start typing to get suggestions"), /*#__PURE__*/ ($parcel$interopDefault($8zHUo$react)).createElement("div", {
        className: `pdl-suggestions-error
          ${errorMessage.length === 0 || !focus || searchTerm.length === 0 ? 'pdl-dn' : ''}`
    }, errorMessage)));
}
var $7894d0d778642671$export$2e2bcd8739ae039 = $7894d0d778642671$var$Autocomplete;



var $882b6d93070905b3$export$2e2bcd8739ae039 = $7894d0d778642671$export$2e2bcd8739ae039;


//# sourceMappingURL=index.js.map
