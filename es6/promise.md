# 概述
一种异步编程的解决方案
优点：将异步操作以同步的流程写出来，使用统一的接口，使得异步控制更容易。
缺点：无法取消promise，如果不设置回调函数，promise中抛出的错误不会反应到外部。

# 基本用法
使用`Promise`构造函数来生成promise实例
```javascript
const p = new Promise((res, rej) => {
    res(1);
});
p.then((res)=>{console.log(res);}, (err)=>{console.log(err);};)
```

`Promise`构造函数接收一个函数作为参数，此函数将会传入`resolve`和`reject`两个函数，执行resolve会将此promise实例的状态变为已完成，然后执行then中的一个回调函数，而执行reject会将状态变为已拒绝，执行then中第二个回调函数。
# resolve
resolve执行后会执行异步成功后的回调函数。传入resolve中的参数会传递给回调函数。但如果传入resolve的是一个promise实例，则该实例的状态会替换当前实例的状态。
```javascript
let p1 = new Promise((res, rej) => {
    setTimeout(res, 300, 'p1');
});
let p2 = new Promise((res, rej) =>{
    res(p1);//向resolve中传入一个新的promise实例
});
p2.then((res) => {
    console.log('res', res);// res p1; p1的状态就替代了p2的状态
}).catch()
```
# Promise.prototype.then()
接收两个函数作为参数，第一表示异步成功之后的回调函数，第二个表示异步失败的回调函数。两个函数的返回值会作为then方法返回promise实例的resolveValue或rejectValue;
```javascript
p = new Promise((res, rej) => {
    res(10);
});// Promise {<resolved>: 10}, resolvedValue为10
p.then(() => {
    return 20;
});  //Promise {<resolved>: 20}
```

# Promise.prototype.catch()
是`then()`的特殊语法，与`then(undefined, reject`语法相同。

# Promise.prototyp.finally()
无论异步操作是否成功都执行的回调函数,并且finally不改变promise实例的的值
```javascript
Promise.resolve(2).then(()=>{}); //Promise {<resolved>: undefined}
Promise.resolve(2).finally(() => {});//Promise {<resolved>: 2}
```

# Promise.all()
接收一个promise实例构成的数组，当其中所有的promise都完成了才执行成功的回调，如果有一个失败了就执行失败的回调。如果参数中的promise实例自己定义了catch方法，如果它被reject，不会触发all的catch

# Promise.race()
同样接收一个promise数组，只要其中有一个状态改变，rece返回的promise实例的状态就随之改变

# Promise.resolve()
将现有对象转换成promise对象，如果参数是个Promise对象则原封不动返回该对象，如果参数一个有then方法的对象，则先执行其then方法，根据其then方法判断promise实例的状态。如果参数是其他类型，则返回一个状态是resolve的promise对象

# Promise.reject()
基本同上，不同之处在于如果参数是其他类型，则返回一个状态是reject的promise对象


