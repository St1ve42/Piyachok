export type IPiyachokReplyCreate = {
    piyachokId: string,
    text: string
}

export type IPiyachokReplyUserInput = Pick<IPiyachokReplyCreate, 'text'>