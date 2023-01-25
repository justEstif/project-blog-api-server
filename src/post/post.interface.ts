interface IPost {
  title: string
  body: string
  summary: string
  tags: string[]
  published: boolean
  publicationDate: Date | undefined
}

export default IPost
