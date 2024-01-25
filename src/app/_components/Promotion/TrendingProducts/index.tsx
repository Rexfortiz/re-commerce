import React from 'react'

import classes from './index.module.scss'
import { Blocks } from '../../Blocks'

const TrendingProducts = ({ product }) => {

  

  // const { relatedProducts } = product

  return (
    <div>
      <div className={classes.titleWrapper}>
        <h3>Trending Products</h3>
      </div>
      {/* <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedProducts',
            blockName: 'Related Product',
            relationTo: 'products',
            introContent: [
              {
                type: 'h3',
                children: [
                  {
                    text: 'Related Products',
                  },
                ],
              },
            ],
            docs: relatedProducts,
          },
        ]}
      /> */}
    </div>
  )
}

export default TrendingProducts