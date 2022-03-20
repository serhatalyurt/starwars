import { useState, useEffect } from "react";
import "./Autocomplete.css";
export type FilterType = "select" | "data";

const Autocomplete: React.FC<{
  service: (filter: string, controller: AbortController) => Promise<any[]>;
  nameProp: string;
  keyProp: string;
  delay?: number;
  onSelected?: (index: number, key: string, item: any) => void;
  onFiltered?: (filter: string, results: any[]) => void;
  filterType: FilterType;
  initialFilter?: string;
}> = ({
  service,
  nameProp,
  delay,
  keyProp,
  onSelected,
  onFiltered,
  filterType,
  initialFilter,
}) => {
  const [filter, setFilter] = useState<string | null>(
    initialFilter !== undefined && initialFilter !== null ? initialFilter : null
  );
  const [results, setResults] = useState<any[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let delayTimeout: number;
    let controller: AbortController;
    if (filter !== null) {
      setResults([]);
      delayTimeout = setTimeout(() => {
        setIsLoading(true);
        controller = new AbortController();
        service(filter, controller)
          .then((serviceResult) => {
            setResults(serviceResult);
            setIsLoading(false);
            if (onFiltered) {
              onFiltered(filter, [...serviceResult]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, delay || 250);
    }
    return () => {
      if (controller) {
        controller.abort();
      }
      clearTimeout(delayTimeout);
      setIsLoading(false);
    };
  }, [filter]);

  return (
    <div
      onFocus={() => {
        if (filter === null) {
          setFilter("");
        }
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="auto-complete">
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type your filter"
        />
        {
          <div className="auto-complete--results">
            {isLoading ? (
              <ul>Loading...</ul>
            ) : (
              filterType === "select" &&
              (focused || hover) && (
                <ul>
                  {results.map((result, index) => (
                    <li
                      key={result[keyProp]}
                      onClick={() => {
                        if (onSelected) {
                          onSelected(index, result[keyProp], result);
                        }
                        setHover(false);
                      }}
                    >
                      {result[nameProp]}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Autocomplete;
