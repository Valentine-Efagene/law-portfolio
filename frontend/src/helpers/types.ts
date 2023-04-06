import { SanityAsset } from "@sanity/image-url/lib/types/types"

interface IPost {
    _id: string,
    title: string,
    name?: string,
    categories?: ICategory[],
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

interface IContext {
    params: {
        slug: string
    }
}

interface ICategory {
    _id: string,
    title: string,
    description?: string,
    slug: ISlug
}

interface ISanityImage {
    _type: string,
    asset: SanityAsset
}

export type { ISanityImage, IContext, ICategory, IComment, IPost, ISlug }