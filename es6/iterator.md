# 概述
为数据结构提供了一个统一的访问接口。一个具有next方法，且其返回一个具有value和done属性的对象的对象就可以认为是一个遍历器。

# 默认的iterator接口
一个对象只要有`Symbol.iterator`属性，就是可遍历的。可以用`for...of...`遍历。部署了原生iterator接口的有：
- Array
- Map
- set
- String
- arguments
- NodeList对象
一个对象要是需要被for...of遍历就需要部署`Symbol.iterator`方法。比如下列代码就定义了一个range类
```javascript
class Range{
    constructor(start, stop){
        this.start = start;
        this.stop = stop;
        this.cur = start;
    }
    [Symbol.iterator](){
        return this;
    }
    next(){
        let value = this.cur;
        if(value < this.stop){
            this.cur++;
            return {
                done: false,
                value,
            };
        }
        
        else
            return {
                done: true,
                value: undefined
            }

    }
}
let range = new Range(3, 10);
for(let i of range){
    console.log(i);
}
console.log([...new Range(1,5)]);
```
# 调用iterator接口的场合
- 解构赋值
- 扩展运算符
- yield*
  yield*后跟一个可遍历的解构，则会调用其遍历器接口
  ```javascript
  let generator = function* (){
      yield 1;
      yield* [1,2,3];
  };
  let it = generator();
  it.next() //1
  it.next() //1
  it.next() //2
  it.next() //3
  ```
# 遍历对象的return()
如果在for...of...中break了后会调用iterator对象的return方法
```javascript {cmd='node'}
let obj = {};
obj[Symbol.iterator] = function(){
    let index = 0;
    return {
        next(){
            if(index < 5){
                index++;
                return {value:index, done: false};
            }else{
                return {value: index, done: true};
            }
        },
        return(){
            console.log('breaking');
            return {done: true};
        }
    };
};
for(let i of obj){
    console.log(i);
    if(i == 3){
        break;
    }
}
```
