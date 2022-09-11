interface AutocompleteProps {
    field: string;
    size?: number;
    onTermSelected: (term: string) => void;
    apiKey: string;
    placeholder: string;
}
declare function Autocomplete({ field, size, onTermSelected, apiKey, placeholder }: AutocompleteProps): JSX.Element;
export default Autocomplete;

//# sourceMappingURL=index.d.ts.map
