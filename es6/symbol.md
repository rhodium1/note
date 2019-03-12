# 概述
symbol表示一个独一无二的值，可以使用Symbol函数来构造一个symbol。
```javascript
let s1 = Symbol();
let s2 = Symbol();
s1 == s2 //false
```
`Symbol`不能参加运算会报错
```javascript
s1 + "dfd"        // TypeError: can't convert symbol to string
```
但是可以显式的转化成字符串
```javascript
let s1 = Symbol();
String(s1); //Symbol()
```
# Symbol.for(), Symbol.keyFor()
`Symbol.for(key)`产生一个symbol，并且在全局注册此key生成的symbol。
如果key之前使用过则返回同一个symbol
```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 == s2 //true
```
`Symbol.keyFor()`返回一个已经登记的symbol值的key
```javascript
let s1 = Symbol.for('foo');
Symbol.keyFor(s1);  //'foo'
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
# 内置的Symbol值
## Symbol.hasInstance
当其他对象调用`instanceof`运算符时，会调用该类的此静态方法
```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```
## Symbol.isConcatSpreadable
表示concat时是否可以展开
```javascript
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```
当需要concat的是一个类数组对象时：
```javascript
let obj = {length:2, 0:'a', 1:'b'};
obj[Symbol.isConcatSpreadable] = true;
[].concat(obj); //['a', 'b'];
```
## Symbol.species
解决了衍生对象创建的问题
``` javascript
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
```
如果指定了`species`:
```javascript
class MyArray extends Array{
    static get [Symbol.species](){return Array;}
}
const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
```
## Symbol.match
指向一个函数，当被匹配时，调用该函数，返回返回值
```javascript {cmd='node'}
class MyClass{
    [Symbol.match](){
        console.log(arguments);
    }
}
let a = new MyClass();
'a'.match(a);
```
类似的还有`Symbol.replace`, `Symbol.search`, `Symbol.split`

## Symbol.iterator
指向该对象的默认遍历器方法
```javascript {cmd='node'}
let obj = {};
obj[Symbol.iterator] = function*(){
    yield 1;
    yield 2;
    yield 3;
};
console.log([...obj]);
```
## Symbol.toPrimitive
如果有该方法，则当需要将对象转换成原始类型时调用该方法。此方法传入一个参数表示在什么环境下转换
1. number: 需要转化成数值
2. string: 需要转换成字符串
3. default: 可以成字符也可以成数值
```javascript {cmd='node'}
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};
console.log(obj < 124);
console.log(obj + 1);
console.log(String(obj));
```

## Symbol.toStringTag
如果有改属性，则出现在toString后的标志中
```javascript {cmd='node'}
console.log(({[Symbol.toStringTag]: 'Foo'}.toString()));
let arr = [1,2,4];
arr[Symbol.toStringTag] = 'foo';
console.log(Object.prototype.toString.call(arr));
```

## Symbol.unscopables
对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。




