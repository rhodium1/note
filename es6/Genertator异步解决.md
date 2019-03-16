# 概述
为了解决如果嵌套的异步操作过多，回调函数嵌套复杂以及使用Promise代码冗余的问题。可以使用Generator实现同步的书写异步流程。

# 原理
依靠Generator执行到yield就会暂停知道下一次调用next才会继续执行的特点。可以在yield后接异步操作，在异步操作结束后自动调用next方法来继续执行。
以Promise为例：
```javascript
function* gen(){
    let y = yield new Promise(/**/);  //第一个异步操作,y为操作返回的结果
    let y2 = yield new Promise(/**/); //第二个异步操作
    //处理异步返回的数据...

}
let g = gen();
//如果手动调用
let val = g.next();
val.value.then((res) => {
    let val1 = g.next(res); //将结果传入Generator
    val1.value.then((res1) => {
        g.next(res1);               //执行后续的操作
    })
})
```
可以看到如果手动调用要在每个结果返回后运行一下`g.next`;当异步操作较多时可以写一个递归
```javascript
function onThen(res){
    let ret = g.next(res);
    next(ret);
}
function next(v){
    if(v.done){
        return;
    }
    v.value.then(onThen);
}
onThen();
```
# Co模块
Co模块就是讲上面的思路填充，增加了一些条件判断，从而实现异步调用的同步写法,只需要调用一个函数即可自动开始操作：
```
npm install co //安装
```
```javascript
import Co from 'co';
function* getData(){
    //异步请求
    let res = yield this.requestPromise({
            api:"getIpoList",
        }); 
        //处理异步请求                              
        console.log(res);
        //下一个异步
        res = yield this.requestPromise({
            api:'getIPOProduct'
        });
        //处理结果
        console.log(res);
}
Co(getData);   //自动开始
```
具体使用方法点此[链接](https://github.com/tj/co);