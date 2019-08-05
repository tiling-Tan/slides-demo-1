var n
init()

setInterval(() => { 
    makeLeave(getImage(n))
        .one('transitionend', (e) => { 
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n+1))
    n = n + 1
}, 1500)


function getImage(n) { 
    return $(`.image>img:nth-child(${x(n)})`)
}
function x(n) { 
    if (n > 5) { 
        n = n % 5
        if (n === 0) { 
            n=5
        }
    }
    return n
}

function init() { 
    n = 1
    $(`.image>img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function makeCurrent($node) { 
    return $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node) { 
    return $node.removeClass('enter current').addClass('leave')
     
}
function makeEnter($node) { 
    return $node.removeClass('current leave').addClass('enter')
}