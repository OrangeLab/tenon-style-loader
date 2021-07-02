import { Selector, MatchType} from "."

enum Token {
  Dot = '.',
  Space = ' ',
  LeftBrace = '[',
  RightBrace = ']'
}

export function parseSelector(selector: string):(Selector | null){
  if(!selector){
    return null
  }

  let tokenStack = new TokenStack()
  for(let len=selector.length,i = len-1;i >= 0; i--){
    let curToken = selector.charAt(i)
    switch(curToken){
      case Token.Space:
        // TODO
        break;
      case Token.Dot:
        // TODO
        break;
      default:
        tokenStack.push(curToken)
        break;
    }
  }
  return new Selector(selector, MatchType.Class)
}



class Stack<T>{
  private _arr:Array<T> = []
  constructor(){}

  get arr(){
    return this._arr
  }

  push(item:T){
    this._arr.push(item)
  }

  pop(){
    return this._arr.pop()
  }

  empty(){
    this._arr = []
  }
}

class TokenStack extends Stack<string>{
  constructor(){
    super()
  }

  toToken(){
    return this.arr.reverse().reduce((last:string, current:string) => {
      return last + "" + current
    })
  }
}
