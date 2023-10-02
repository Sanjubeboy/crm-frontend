export type IssueType = {
    customer_name: string[]
    issue_no:number
    name:string
    priority:string
    stage:string
    tickets:number[],
    _v:number
    _id:string
    owner:{
        name:string,
        email:string,
        _v:number,
        _id:string
    }
}