import { SanityAsset } from "@sanity/image-url/lib/types/types"

export interface IPost {
    _id: string,
    title: string,
    name?: string,
    categories?: ICategory[],
    author?: {
        name: string,
        image: ISanityImage
    },
    description?: string,
    mainImage?: ISanityImage,
    slug: ISlug,
    _createdAt: string,
    comments?: IComment[]
}

export interface IComment {
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

export interface ISlug {
    _type: string,
    current: string
}


export interface ICategory {
    title: string
}

export interface ISanityImage {
    _type: string,
    asset: SanityAsset
}