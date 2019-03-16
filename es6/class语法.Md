# 基本用法
为了更好的定义类, es6引入了class语法：
```javascript
class Point{
    //构造函数
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    //原型方法
    getLength(){
        let x = this.x, y = this.y;
        return Math.squrt(x**2 + y**2);
    }
}
```
没找到如何使用class语法在原型上添加普通属性。