import { RawNodeDatum } from "react-d3-tree";

const delimiters = [",", ":", "  ", "|", ";", "/"];

// search for new lines. For each line break, push a new string to the array.
export function convertStringToArray(delimitedText: string): string[][] {
  const regex = new RegExp(`[${delimiters.join("|")}]`);
  const newlineArray = delimitedText.split(/\r?\n/);
  let delimitedArray: string[][] = [];

  newlineArray.forEach((line) => {
    const delimitedLine = line.split(regex);
    delimitedArray.push(delimitedLine.filter((n) => n));
  });

  return delimitedArray;
}

export function createFibonacciTree(fibonacciArray: number[]) {
  const rootNode = createNode(fibonacciArray, fibonacciArray.length - 1, false);
  return rootNode;
}

function createNode(
  fibonacciArray: number[],
  index: number,
  ignoreChildren: boolean
): RawNodeDatum | null {
  if (index <= 0) {
    return null;
  }

  const node: RawNodeDatum = {
    name: `${fibonacciArray[index]}`,
    children: [],
  };

  const firstNode = createNode(fibonacciArray, index - 1, false);
  if (firstNode && !ignoreChildren) {
    node.children?.push(firstNode);
  }

  const secondNode = createNode(fibonacciArray, index - 2, true);
  if (secondNode && !ignoreChildren) {
    node.children?.push(secondNode);
  }

  return node;
}
