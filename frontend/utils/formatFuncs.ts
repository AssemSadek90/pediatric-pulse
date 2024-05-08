export function formatName(name: string){
    if(name)
    return name[0].toUpperCase() + name.slice(1)
    else
    return("")
};
export function formatTime(time:string){
    if(time){
        if(Number(time) > 12)
            return `${Number(time)-12} pm`
        else
        return `${time} am`
    }
}

export function formatTimeNum(time:number){
    if(time){
        if(time > 12)
            return time - 12
        else
        return time
    }
}