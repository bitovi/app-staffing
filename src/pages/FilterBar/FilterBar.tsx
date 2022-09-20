import { useState } from "react";
import { Flex, Badge, Input, FlexProps } from "@chakra-ui/react";
import { SearchIcon } from "../assets";
import { CloseIcon } from "@chakra-ui/icons";

interface FilterBarProps extends FlexProps {
  onFilterChange(filters: string[]): void;
  placeholder?: string;
}

export default function FilterBar({
  onFilterChange,
  placeholder,
  ...props
}: FilterBarProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const removeFilter = (i: number) => {
    filters.splice(i, 1);
    setFilters([...filters]);
    onFilterChange(filters.map((f) => f.toLocaleLowerCase()));
  };

  const onKeyDownFilter = (i: number, ev: React.KeyboardEvent) => {
    const keyCode = ev.keyCode;
    if (keyCode === 32 || keyCode === 13) {
      // space or enter
      removeFilter(i);
      ev.preventDefault();
    }
  };

  const onKeyDownInput = (ev: React.KeyboardEvent) => {
    const inputEl = ev.target;
    if (!(inputEl instanceof HTMLInputElement)) {
      return;
    }
    const val = inputEl.value;
    const keyCode = ev.keyCode;
    if (keyCode === 32 || keyCode === 9) {
      // space or tab
      const newFilter = val.trim();
      if (newFilter.length) {
        filters.push(newFilter);
        setFilters([...filters]);
        setInputValue("");
        ev.preventDefault();
      }
    } else if (!val && keyCode === 8) {
      // backspace
      setInputValue(filters.pop() || "");
      setFilters([...filters]);
      ev.preventDefault();
    }
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = ev.target;
    const newVal = inputEl.value;
    const newValTrimmed = newVal.trim();
    const lowerAll = filters.map((f) => f.toLocaleLowerCase());
    newValTrimmed && lowerAll.push(newValTrimmed.toLocaleLowerCase());
    setInputValue(newVal);
    onFilterChange(lowerAll);
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const inputEl = ev.target;
    const newFilter = inputEl.value.trim();
    if (newFilter.length) {
      filters.push(newFilter);
      setFilters([...filters]);
      setInputValue("");
    }
  };

  return (
    <Flex
      display="inline-flex"
      background="white"
      borderColor="gray.200"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius="md"
      px="3"
      py="2"
      color="gray.100"
      mt="6"
      ml="10"
      mr="auto"
      minWidth="400px"
      maxWidth="calc(100% - 5rem)"
      overflowX="auto"
      position="relative"
      _before={{
        content: "''",
        position: "sticky",
        left: "-3",
        width: "0px",
        paddingRight: "25px",
        marginRight: "-25px",
        top: "-2",
        bottom: "-2",
        background: "white",
      }}
      {...props}
    >
      <SearchIcon
        color="gray.400"
        w={5}
        h="auto"
        mr={3}
        position="sticky"
        left="0"
        background="white"
      />
      {filters.map((filter, i) => (
        <Badge
          key={`${filter} ${i}`}
          onClick={removeFilter.bind(null, i)}
          onKeyDown={onKeyDownFilter.bind(null, i)}
          variant="solid"
          isTruncated={false}
          size="sm"
          whiteSpace="break-spaces"
          textAlign="center"
          display="flex"
          alignItems="center"
          mr={1.5}
          borderRadius="md"
          textTransform="none"
          pl={2}
          cursor="pointer"
          title="Remove Filter"
          tabIndex={0}
          _focus={{
            outlineStyle: "solid",
            outlineOffset: "1px",
            outlineWidth: "3px",
            outlineColor: "blue.200",
          }}
        >
          {filter}
          <CloseIcon mx={2} w={2} h={2} />
        </Badge>
      ))}
      <Input
        variant="unstyled"
        placeholder={placeholder || "Search..."}
        color="gray.800"
        width="80"
        minWidth="80"
        onKeyDown={onKeyDownInput}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Flex>
  );
}
