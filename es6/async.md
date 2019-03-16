# 概述
async 函数就是上一章节自动化generator异步流程的规范。使用方法:
```javascript
async function f(){
    const re1 = await getData('./api/data');
    const re2 = await getDate('./api/data2');
    console.log(re1);
    console.log(re2);
}
```
# 基本用法
async 函数返回一个Promise对象，其then中resolve回调参数是async函数的返回值。
```javascript
async function f(){
    let re1 = await new Promise((res) => {
        setTimeout(() => {
            res({data: 10});
        }, 100);
    });
    let re2 = await new Promise((res) => {
        setTimeout(()=>{
            res({data:20});
        }, 100);
    });
    console.log(re1);
    console.log(re2);
    return 'done';
}
f().then((res) => {
    console.log('res', res);
})
//{ data: 10 }
//{ data: 20 }
//res done
```
上述async函数表示先得到re1的结果后再去获取re2的结果，如果要两者一起，可以把re1和re2的promise放在`Promise.all`中。

有多种声明async函数的方式：
```javascript
// 函数声明
async function f(){}

//函数表达式
const f = async function(){}

//方法
let obj = {
    async f(){}
};

// class 方法
class C{
    async f(){

    }
}

//箭头函数
async () => {}
```
# await 
await后应该是promise对象，如果不是，则会直接返回其值
```javascript
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```
# 错误处理机制
async 函数中抛出错误会使其返回的promise对象的状态为reject。可以在catch中获取到。如果函数中任意一个await后的promise中抛出错误或者状态变成reject，会尝试从内向外捕获。

# 异步遍历器
调用next 方法返回的是个promise对象，部署对象的`Symbol.asyncIterator`方法，就可以使该对象可以异步遍历。

# for await...of
用来遍历异步遍历器。用法:
```javascript
async function f(){
    for await(const i of asynciter){
        //...
    }
}
```
如果有promise被reject了，则会报错。

# 异步generator函数
和普通的generator函数一样，不过异步的gen函数返回的是一个异步迭代器。
基本用法:
```javascript
async function* gen(){
    const re = await fetchData();
    yield re;
}
let it = gen();
it.next().then((x) => {
    console.log(x);
});
```