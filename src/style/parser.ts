import { Selector, MatchType } from ".";
import { RelationType } from "./selector";

enum Token {
  PoundSign = "#",
  Dot = ".",
  Space = " ",
  LeftBrace = "[",
  RightBrace = "]",
}

export function parseSelector(selector: string): Selector | null {
  if (!selector) {
    return null;
  }

  let tokenStack = new TokenStack();
  // let firstSelector:(Selector | null) = null
  let selectorList: Array<Selector> = [];
  for (let len = selector.length, i = len - 1; i >= 0; i--) {
    let curToken = selector.charAt(i);
    let curSelector = null;
    switch (curToken) {
      case Token.PoundSign:
        if (!tokenStack.isEmpty()) {
          // Id
          curSelector = new Selector(
            tokenStack.toToken(),
            MatchType.ID,
            RelationType.Subselector
          );
          selectorList.push(curSelector);
          tokenStack.empty();
        }
        break;
      case Token.RightBrace:
        // Just Jump
        break;
      case Token.LeftBrace:
        if (!tokenStack.isEmpty()) {
          // Id
          curSelector = new Selector(
            tokenStack.toToken(),
            MatchType.Attr,
            RelationType.Subselector
          );
          selectorList.push(curSelector);
          tokenStack.empty();
        }
        break;
      case Token.Space:
        if (!tokenStack.isEmpty()) {
          curSelector = new Selector(
            tokenStack.toToken(),
            MatchType.Tag,
            RelationType.Subselector
          );
          tokenStack.empty();
          selectorList.push(curSelector);
          let lastSelector = getLastSelector(selectorList);
          if (lastSelector) {
            lastSelector.appendNext(curSelector);
            lastSelector.relation = RelationType.DescendantSpace;
          }
        }
        let lastSelector = getLastSelector(selectorList);
        if (lastSelector) {
          lastSelector.relation = RelationType.DescendantSpace;
        }
        break;
      case Token.Dot:
        if (!tokenStack.isEmpty()) {
          // Class
          curSelector = new Selector(
            tokenStack.toToken(),
            MatchType.Class,
            RelationType.Subselector
          );
          selectorList.push(curSelector);
          tokenStack.empty();
        }
        break;
      default:
        tokenStack.push(curToken);
        break;
    }
  }
  // 处理 TokenStack 剩余的场景，tag 场景
  if (!tokenStack.isEmpty()) {
    let selector = new Selector(
      tokenStack.toToken(),
      MatchType.Tag,
      RelationType.Subselector
    );
    selectorList.push(selector);
    tokenStack.empty();
  }

  // 处理 Selector List ，返回标准的链表式的 Selector
  if (selectorList.length > 0) {
    selectorList.reduce((lastSelector: Selector, curSelector: Selector) => {
      if (lastSelector) {
        lastSelector.next = curSelector;
      }
      lastSelector = curSelector;
      return lastSelector;
    });
    return selectorList[0];
  }
  return null;
}

class Stack<T> {
  private _arr: Array<T> = [];
  constructor() {}

  get arr() {
    return this._arr;
  }

  push(item: T) {
    this._arr.push(item);
  }

  pop() {
    return this._arr.pop();
  }

  empty() {
    this._arr = [];
  }

  isEmpty() {
    return this._arr.length === 0;
  }
}

class TokenStack extends Stack<string> {
  constructor() {
    super();
  }

  toToken() {
    return this.arr.reverse().reduce((last: string, current: string) => {
      return last + "" + current;
    });
  }
}

function getLastSelector(arr: Array<Selector>): Selector | null {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}
