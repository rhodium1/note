# 概述
一种代理，有拦截对象操作的功能：
```javascript {cmd='node'}
let proxy = new Proxy({}, {
    get(target, key){ //对get进行拦截
        console.log('getting '+ key);
        return target[key];
    },
    set(target, key, value){ //对set进行拦截
        console.log('setting ' + key);
        return target[key] = value;
    }
});
proxy.x = 10
console.log(proxy.x);
```
proxy总共支持以下13种拦截操作
- get(target, propKey, receiver):拦截对象的属性读取
- set(target, key, value, receiver): 拦截对象属性设置
- has(target, key): 拦截对象 `key in proxy`操作
- deleteProperty(target, key): 拦截delete操作
- ownKeys(target): 拦截`Object.getOwnPropertyNames(proxy)`
- getOwnPropertyDescripter(target, key)
- defineProperty(target, key, desc)
- preventExtensions(target)
- getPrototypeOf(target)
- isExtensible(target)
- setPrototypeOf(target, proto)
- apply(target, thisbind, args)
- construct(target, args): 拦截proxy作为构造函数的操作


## apply()
拦截函数的调用，call和apply操作
```javascript {cmd='node'}
function target(){
    return "i am not a proxy";
}
let proxy = new Proxy(target, {
    apply(){
        return 'I am Proxy';
    }
});
console.log(proxy());
```
## has()
拦截in操作
```javascript 
    let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true
```
但不拦截 for... in...

## construct()
拦截new 操作
```javascript {cmd='node'}
let proxy = new Proxy(function(name){this.name = name}, {
  construct(tar, arg){
    console.log(arg);
    return new tar(...arg);
  }
});
console.log(new proxy('Jerry'));
```
## deleteProperty()
拦截`delete`操作，如果这个方法抛出错误或者返回false,则此属性就无法被删除
```javascript {cmd='node'}
let obj = {name:'apple'}
let proxy = new Proxy(obj, {
  deleteProperty(target, key){
    console.log('deleting ' + key);
    delete target[key];
    return false;
  }
});
delete proxy['name'];
console.log(obj);
```

# Proxy.revocable()
返回一个对象，其proxy属性为proxy实例，revoke属性为一个方法，调用该方法后就会取消其proxy实例
```javascript
let target = {};
let handler = {};

let obj = Proxy.revocable(target, handler);//{proxy: Proxy, revoke: ƒ}
obj.revoke();
obj.proxy.foo = 10; //Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```