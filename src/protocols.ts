export interface PostTask  {
    title: string,
    description: string,
    dateOfCompletion: Date | null
}

export interface GetTasks extends PostTask {
    id: number,
    dateOfCompletion: Date, 
    dateOfCreation: Date,
    concluded: boolean
}