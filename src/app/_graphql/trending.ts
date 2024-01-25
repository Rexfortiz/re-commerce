import { META } from './meta'

export const TRENDING = `
  query Categories {
    Categories(limit: 300) {
      docs {
        id
        title
        relatedProducts {
          id
          slug
          title
          ${META}
        }
      }
    }
  }
`