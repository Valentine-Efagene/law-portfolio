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
    slug: ISlug
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