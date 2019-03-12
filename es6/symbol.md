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