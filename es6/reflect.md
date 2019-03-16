# 概述
为了操作对象而提供的新的api。把Object一些明显属于语言内部的方法，部署到Reflect对象上，修改某些Object的方法。让Object的操作变成函数行为。reflect方法和proxy对象的方法一一对应。
reflect对象总共有13个静态方法，与proxy一一对应
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)