# set和map数据结构
## set概述
表示一种无重复元素的集合，可以用`new Set()`来创建一个集合。接收一个参数，此参数可以是任何可迭代的对象。
```javascript
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
```
## set属性实例属性及方法
### 属性
- size: 实例的成员总数
### 方法
- `add(value)` 添加某个值，返回set实例
- `delete(value)`删除某个值，返回布尔值，表示是否删除成功
- `has(value)`判断某个值是否是set成员
- `clear()`清除所有成员，无返回值
- `keys()` 返回键名的遍历器
- `values()`键值的遍历器
- `entries()`键值对的遍历器
- `forEach()` 遍历
set 的键名和键值相等

## weakset 
weakset的成员只能是对象，并且是弱引用，表示如果weakset中的成员被垃圾回收机制回收了的话，其相应的成员会消失。所以weakset不能遍历。weakset的用处是可以用来储存dom节点，而不用担心引发内存泄漏。

## map
键值对，任何值都可以为键。
```javascript
let map = new Map([
    ['name', 'ergou'],
    ['title', 'Author']
]);
```
### map属性和方法
#### 属性
- size: 元素个数
#### 方法
- set(key, value)
- get(key)
- has(key)
- delete(key)
- clear()
- keys()
- values()
- entries()
- forEach() 遍历，函数有3个参数分别是value, key, map
