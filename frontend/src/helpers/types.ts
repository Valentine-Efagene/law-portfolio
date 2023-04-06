import { SanityAsset } from "@sanity/image-url/lib/types/types"

interface IPost {
    _id: string,
    title: string,
    name?: string,
    categories?: string[],
    description?: string,
    mainImage?: ISanityImage,
    slug: ISlug,
    _createdAt: string,
    publishedAt: string,
    comments?: IComment[],
    author?: {
        name: string,
        image: string,
    },
    authorImage?: ISanityImage,
    body: any[]
}

interface IComment {
    _id: string,
    name: string,
    email: string,
    comment: string
}

interface IComment {
    approved: boolean,
    comment: string,
    email: string,
    name: string,
    post: {
        _ref: string,
        _type: string,
    }
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}

interface ISlug {
    _type: string,
    current: string
}


interface ICategory {
    title: string
}

interface ISanityImage {
    _type: string,
    asset: SanityAsset
}

export type { ISanityImage, ICategory, IComment, IPost, ISlug }