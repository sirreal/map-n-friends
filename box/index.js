const i = require('util').inspect

const id = x => x
const compose = g => f => x => f(g(x))

function Box(val) {
    return {
        map: (f) => Box(f(val)),
        fold: (f) => f(val),
        inspect: () => `Box(${i(val)})`,
        toString: () => `Box(${i(val)})`,
    }
}

console.log(
    'Box mapping:', 

Box('123abc')
    .map(s => 'Hello ' + s)
    .map(s => s + ' world!')
    .map(s => s.split(' '))
    .map(arr => [arr[0]].concat(arr[arr.length - 1]))
    .map(arr => arr.join(' '))
    //.fold(id)
    
)


console.log(
    'ID law holds: %s === %s',
    Box(10),
    Box(10).map(id)
)

console.log(
    'Composition holds: %s === %s',
    Box(10).map(
        compose(x => x * 10)(x => x - 2)
    ),
    Box(10).map(x => x * 10).map(x => x - 2)
)