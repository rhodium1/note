# 概述
类似于python中的生成器，使用yield生成一系列的值。基本用法：
```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next() // {value: 'hello', done: false}
hw.next() // {value: 'world', done: false}
hw.next() // {value: 'ending', done: true}
```
使用`function*`来声明返回一个迭代器对象，每次运行到yield语句时就暂停。`return`语句的返回值作为最后一个返回的值。

# next()方法的参数
next方法可以传入参数，作为上一个yield表达式的返回值
```javascript
function* gen(){
    let y = yield 1;
    console.log(y);
}
let t = gen();
t.next() ;//{value: 1, done: false}；
t.next('hello');  //hello ,{value: undefined, done: true}
```
注意：第一个next方法表示的是生成器的启动，所以如果传入参数是无效的。
# throw()
调用迭代器throw方法，可以在生成器内部捕获到错误
```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```
throw 方法可以传入一个参数，该参数会被`catch`捕获

# 遍历器的return()方法
可以终止遍历的的执行，并使返回的值为return的参数
```javascript
function* gen(){
    while(true){
        yield 1;
    }
}
let it = gen();
it.next(); //{value:1, done: false};
it.return(10);//{value: 10; done: true};
```
# yield*表达式
在generator函数中嵌套使用迭代器对象
```javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
``` 