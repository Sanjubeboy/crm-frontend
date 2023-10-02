export const getConvertedNumber = (num:number):string => {
    if(num < 10) {
        return "000" + num.toString()
    }
    if(num < 100) {
        return "00" + num.toString()
    }
    if(num < 1000) {
        return "000" + num.toString()
    }
    return ''
}