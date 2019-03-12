# js中面向对象程序设计
## 创建对象
### 工厂模式
接收参数返回一个对象
```javascript
function createPerson(name, age, job){
    let o = {};
    o.name = name;
    o.age = age;
    o.job = job;
    return o;
}
let person1 = createPerson('Bob', 11, 'software engineer');
```
缺点：**无法识别创建的对象属于哪一种类型**

### 构造函数模式
```javascript {cmd='node'}
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
}
let person1 = new Person('Bob', 11,'software engineer');
console.log(person1 instanceof Person);//person1是Person的一个实例
```
缺点：**每个方法和属性都要在每个实例上创建一遍**
于是就有了原型链模式
### 组合使用构造函数和原型
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
}
Person.prototype = {
    constructor: Person,
    sayHi: function(){
        console.log('hi');
    }
}
```
### 稳妥的构造函数模式
在闭包中定义私有属性，暴露接口来操作
```javascript
function Person(name, age, job){
    let o = {}
    o.getName = function(){
        return name;
    }
    //...
}
```
### Es6 class模式

## 继承
### 原型继承
简单来说就是子类的原型是父类的一个实例
```javascript
function superClass(){
    this.prop = true;
}
superClass.prototype.say = function(){
    console.log(this.prop);
}
function subClass(){
    this.prop = false;
}
subClass.prototype = new superClass();
subClass.prototype.constructor = subClass;
```
缺点： **在构造子类实例时不能向超类的构造函数中传递参数**
### 借用构造函数
在子类的构造函数中调用父类的
```javascript
function SuperType(){ 
    this.colors = ["red", "blue", "green"]; 
} 
function SubType(){ 
 // SuperType 
    SuperType.call(this); 
} 
var instance1 = new SubType(); 
instance1.colors.push("black"); 
alert(instance1.colors); //"red,blue,green,black" 
var instance2 = new SubType(); 
alert(instance2.colors); //"red,blue,green" 
```
缺点: **子类中无法获取到父类原型上的属性和方法**
### 组合继承
在借用构造函数的基础上创建原型对象
```javascript
function SuperType(name){ 
    this.name = name; 
    this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function(){ 
    alert(this.name); 
};
function SubType(name, age){ 
    SuperType.call(this, name); 
    this.age = age; 
} ;
SubType.prototype = new SuperType(); 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){ 
    alert(this.age); 
}; 
```
缺点：**调用了两次父类构造函数**
### 原型式继承
以某个对象为原型创建新对象
```javascript
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```
es5的`Object.create()`规范了这种方法

###寄生式继承
利用在工厂函数中使用上述`object`方法;
```javascript
function createAnother(o){
    let obj = object(o);//继承属性方法
    obj.newProp = 'new'; //增强对象
    return obj
}
```
### 寄生组合式
解决组合继承中两次调用父类构造函数的问题，将子类的原型设置为父类原型的一个副本即可
```javascript
function inheritPrototype(sub, sup){
    sub.prototype = object(sup.prototype);
    sub.prototype.constructor = sub;
}
```
### es6 class extends继承